import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

import type {
  AdultEligibility,
  LaunchQualificationInput,
  LondonArea,
  PlaceType,
} from './launch-qualification-schema';

type RegistrationRow = {
  status: 'pending' | 'confirmed';
  token_hash: string;
  token_created_at: string;
};

export type LaunchRegistrationAdminRow = {
  email: string;
  status: 'pending' | 'confirmed';
  placeType: PlaceType | null;
  londonArea: LondonArea | null;
  adultEligibility: AdultEligibility | null;
  qualificationCompletedAt: string | null;
  confirmationSentAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
};

export type LaunchRegistrationAdminData = {
  total: number;
  pending: number;
  confirmed: number;
  qualified: number;
  registrations: LaunchRegistrationAdminRow[];
};

type PendingRegistration = {
  status: 'pending';
  email: string;
  token: string;
};

type ConfirmedRegistration = {
  status: 'already-confirmed';
  email: string;
};

export type RegistrationStart =
  | PendingRegistration
  | ConfirmedRegistration;

export type ConfirmationResult =
  | 'confirmed'
  | 'already-confirmed'
  | 'invalid'
  | 'expired';

const tokenLifetimeMs = 7 * 24 * 60 * 60 * 1000;

let database: DatabaseSync | undefined;
let openDatabasePath = '';

function databasePath() {
  return resolve(
    process.env.TOGETHER_DATA_PATH || 'data/together-registrations.sqlite',
  );
}

function getDatabase() {
  const path = databasePath();

  if (database && openDatabasePath === path) {
    return database;
  }

  database?.close();
  mkdirSync(dirname(path), { recursive: true });
  database = new DatabaseSync(path);
  openDatabasePath = path;
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS launch_registrations (
      email TEXT PRIMARY KEY,
      status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed')),
      token_hash TEXT NOT NULL,
      token_created_at TEXT NOT NULL,
      confirmation_sent_at TEXT,
      confirmed_at TEXT,
      consent_version TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS launch_qualifications (
      email TEXT PRIMARY KEY
        REFERENCES launch_registrations(email) ON DELETE CASCADE,
      place_type TEXT NOT NULL
        CHECK (
          place_type IN (
            'social_event',
            'gig',
            'bar_cafe',
            'class_club'
          )
        ),
      london_area TEXT NOT NULL
        CHECK (
          london_area IN (
            'central',
            'north',
            'east',
            'south',
            'west',
            'outside_london'
          )
        ),
      adult_eligible INTEGER NOT NULL
        CHECK (adult_eligible IN (0, 1)),
      completed_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS launch_survey_responses (
      visitor_hash TEXT PRIMARY KEY,
      email TEXT UNIQUE
        REFERENCES launch_registrations(email) ON DELETE CASCADE,
      place_type TEXT NOT NULL
        CHECK (
          place_type IN (
            'social_event',
            'gig',
            'bar_cafe',
            'class_club'
          )
        ),
      london_area TEXT NOT NULL
        CHECK (
          london_area IN (
            'central',
            'north',
            'east',
            'south',
            'west',
            'outside_london'
          )
        ),
      adult_eligible INTEGER NOT NULL
        CHECK (adult_eligible IN (0, 1)),
      created_at TEXT NOT NULL
    );
  `);

  return database;
}

function normalizedEmail(value: string) {
  return value.normalize('NFKC').trim().toLowerCase();
}

export function validLaunchEmail(value: string) {
  const email = normalizedEmail(value);
  return (
    email.length > 3 &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function visitorHash(visitorId: string) {
  return createHash('sha256').update(visitorId).digest('hex');
}

function hashesMatch(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(actual, 'hex');

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function startLaunchRegistration(rawEmail: string): RegistrationStart {
  const email = normalizedEmail(rawEmail);

  if (!validLaunchEmail(email)) {
    throw new Error('Enter a valid email address.');
  }

  const db = getDatabase();
  const existing = db
    .prepare(
      'SELECT status, token_hash, token_created_at FROM launch_registrations WHERE email = ?',
    )
    .get(email) as RegistrationRow | undefined;

  if (existing?.status === 'confirmed') {
    return { status: 'already-confirmed', email };
  }

  const token = randomBytes(32).toString('base64url');
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO launch_registrations (
      email,
      status,
      token_hash,
      token_created_at,
      consent_version,
      created_at
    ) VALUES (?, 'pending', ?, ?, '2026-07-24', ?)
    ON CONFLICT(email) DO UPDATE SET
      token_hash = excluded.token_hash,
      token_created_at = excluded.token_created_at
  `).run(email, tokenHash(token), now, now);

  return { status: 'pending', email, token };
}

export function markConfirmationSent(email: string) {
  getDatabase()
    .prepare(
      'UPDATE launch_registrations SET confirmation_sent_at = ? WHERE email = ?',
    )
    .run(new Date().toISOString(), normalizedEmail(email));
}

export function confirmLaunchRegistration(
  rawEmail: string,
  token: string,
): ConfirmationResult {
  const validation = validateLaunchRegistrationToken(rawEmail, token);

  if (validation !== 'pending') {
    return validation;
  }

  const email = normalizedEmail(rawEmail);
  const db = getDatabase();

  db.prepare(`
    UPDATE launch_registrations
    SET status = 'confirmed', confirmed_at = ?
    WHERE email = ?
  `).run(new Date().toISOString(), email);

  promoteLaunchSurveyResponse(email);

  return 'confirmed';
}

export function validateLaunchRegistrationToken(
  rawEmail: string,
  token: string,
): 'pending' | 'already-confirmed' | 'invalid' | 'expired' {
  const email = normalizedEmail(rawEmail);

  if (!validLaunchEmail(email) || !token) {
    return 'invalid';
  }

  const row = getDatabase()
    .prepare(
      'SELECT status, token_hash, token_created_at FROM launch_registrations WHERE email = ?',
    )
    .get(email) as RegistrationRow | undefined;

  if (!row || !hashesMatch(row.token_hash, tokenHash(token))) {
    return 'invalid';
  }

  if (row.status === 'confirmed') {
    return 'already-confirmed';
  }

  if (Date.now() - Date.parse(row.token_created_at) > tokenLifetimeMs) {
    return 'expired';
  }

  return 'pending';
}

export function validateRemovalToken(rawEmail: string, token: string) {
  const email = normalizedEmail(rawEmail);

  if (!validLaunchEmail(email) || !token) {
    return false;
  }

  const row = getDatabase()
    .prepare(
      'SELECT status, token_hash, token_created_at FROM launch_registrations WHERE email = ?',
    )
    .get(email) as RegistrationRow | undefined;

  return Boolean(row && hashesMatch(row.token_hash, tokenHash(token)));
}

export function removeLaunchRegistration(rawEmail: string, token: string) {
  const email = normalizedEmail(rawEmail);

  if (!validateRemovalToken(email, token)) {
    return false;
  }

  const db = getDatabase();
  return (
    db
      .prepare('DELETE FROM launch_registrations WHERE email = ?')
      .run(email).changes === 1
  );
}

export function saveLaunchQualification(
  rawEmail: string,
  token: string,
  input: LaunchQualificationInput,
) {
  const email = normalizedEmail(rawEmail);

  if (
    validateLaunchRegistrationToken(email, token) !==
    'already-confirmed'
  ) {
    return false;
  }

  getDatabase().prepare(`
    INSERT INTO launch_qualifications (
      email,
      place_type,
      london_area,
      adult_eligible,
      completed_at
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      place_type = excluded.place_type,
      london_area = excluded.london_area,
      adult_eligible = excluded.adult_eligible,
      completed_at = excluded.completed_at
  `).run(
    email,
    input.placeType,
    input.londonArea,
    input.adultEligibility === 'yes' ? 1 : 0,
    new Date().toISOString(),
  );

  return true;
}

export function saveLaunchSurveyResponse(
  visitorId: string,
  input: LaunchQualificationInput,
  rawEmail = '',
) {
  const email = rawEmail ? normalizedEmail(rawEmail) : null;
  const db = getDatabase();
  const now = new Date().toISOString();
  const anonymousExpiry = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString();

  db.prepare(
    'DELETE FROM launch_survey_responses WHERE email IS NULL AND created_at < ?',
  ).run(anonymousExpiry);

  if (email) {
    db.prepare('DELETE FROM launch_survey_responses WHERE email = ?').run(email);
  }

  db.prepare(`
    INSERT INTO launch_survey_responses (
      visitor_hash,
      email,
      place_type,
      london_area,
      adult_eligible,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(visitor_hash) DO UPDATE SET
      email = excluded.email,
      place_type = excluded.place_type,
      london_area = excluded.london_area,
      adult_eligible = excluded.adult_eligible,
      created_at = excluded.created_at
  `).run(
    visitorHash(visitorId),
    email,
    input.placeType,
    input.londonArea,
    input.adultEligibility === 'yes' ? 1 : 0,
    now,
  );

  if (email) {
    promoteLaunchSurveyResponse(email);
  }
}

export function promoteLaunchSurveyResponse(rawEmail: string) {
  const email = normalizedEmail(rawEmail);
  const db = getDatabase();
  const registration = db
    .prepare('SELECT status FROM launch_registrations WHERE email = ?')
    .get(email) as { status: 'pending' | 'confirmed' } | undefined;

  if (registration?.status !== 'confirmed') {
    return false;
  }

  const response = db
    .prepare(`
      SELECT place_type, london_area, adult_eligible, created_at
      FROM launch_survey_responses
      WHERE email = ?
    `)
    .get(email) as
    | {
        place_type: PlaceType;
        london_area: LondonArea;
        adult_eligible: 0 | 1;
        created_at: string;
      }
    | undefined;

  if (!response) {
    return false;
  }

  db.prepare(`
    INSERT INTO launch_qualifications (
      email,
      place_type,
      london_area,
      adult_eligible,
      completed_at
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      place_type = excluded.place_type,
      london_area = excluded.london_area,
      adult_eligible = excluded.adult_eligible,
      completed_at = excluded.completed_at
  `).run(
    email,
    response.place_type,
    response.london_area,
    response.adult_eligible,
    response.created_at,
  );

  db.prepare('DELETE FROM launch_survey_responses WHERE email = ?').run(email);
  return true;
}

export function hasCompletedLaunchQualification(
  rawEmail: string,
  token: string,
) {
  const email = normalizedEmail(rawEmail);

  if (
    validateLaunchRegistrationToken(email, token) !==
    'already-confirmed'
  ) {
    return false;
  }

  const row = getDatabase()
    .prepare(
      'SELECT 1 AS completed FROM launch_qualifications WHERE email = ?',
    )
    .get(email) as { completed: 1 } | undefined;

  return row?.completed === 1;
}

export function getLaunchRegistrationAdminData(
  limit = 500,
): LaunchRegistrationAdminData {
  const db = getDatabase();
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 1_000);
  const counts = db
    .prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed,
        SUM(CASE WHEN q.completed_at IS NOT NULL THEN 1 ELSE 0 END) AS qualified
      FROM launch_registrations AS r
      LEFT JOIN launch_qualifications AS q ON q.email = r.email
    `)
    .get() as {
    total: number;
    pending: number | null;
    confirmed: number | null;
    qualified: number | null;
  };
  const rows = db
    .prepare(`
      SELECT
        r.email,
        r.status,
        r.confirmation_sent_at,
        r.confirmed_at,
        r.created_at,
        q.place_type,
        q.london_area,
        q.adult_eligible,
        q.completed_at AS qualification_completed_at
      FROM launch_registrations AS r
      LEFT JOIN launch_qualifications AS q ON q.email = r.email
      ORDER BY r.created_at DESC
      LIMIT ?
    `)
    .all(safeLimit) as Array<{
    email: string;
    status: 'pending' | 'confirmed';
    place_type: PlaceType | null;
    london_area: LondonArea | null;
    adult_eligible: 0 | 1 | null;
    qualification_completed_at: string | null;
    confirmation_sent_at: string | null;
    confirmed_at: string | null;
    created_at: string;
  }>;

  return {
    total: counts.total,
    pending: counts.pending ?? 0,
    confirmed: counts.confirmed ?? 0,
    qualified: counts.qualified ?? 0,
    registrations: rows.map((row) => ({
      email: row.email,
      status: row.status,
      placeType: row.place_type,
      londonArea: row.london_area,
      adultEligibility:
        row.adult_eligible === null
          ? null
          : row.adult_eligible === 1
            ? 'yes'
            : 'no',
      qualificationCompletedAt: row.qualification_completed_at,
      confirmationSentAt: row.confirmation_sent_at,
      confirmedAt: row.confirmed_at,
      createdAt: row.created_at,
    })),
  };
}
