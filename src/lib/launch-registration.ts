import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

type RegistrationRow = {
  status: 'pending' | 'confirmed';
  token_hash: string;
  token_created_at: string;
};

export type LaunchRegistrationAdminRow = {
  email: string;
  status: 'pending' | 'confirmed';
  confirmationSentAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
};

export type LaunchRegistrationAdminData = {
  total: number;
  pending: number;
  confirmed: number;
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
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed
      FROM launch_registrations
    `)
    .get() as {
    total: number;
    pending: number | null;
    confirmed: number | null;
  };
  const rows = db
    .prepare(`
      SELECT
        email,
        status,
        confirmation_sent_at,
        confirmed_at,
        created_at
      FROM launch_registrations
      ORDER BY created_at DESC
      LIMIT ?
    `)
    .all(safeLimit) as Array<{
    email: string;
    status: 'pending' | 'confirmed';
    confirmation_sent_at: string | null;
    confirmed_at: string | null;
    created_at: string;
  }>;

  return {
    total: counts.total,
    pending: counts.pending ?? 0,
    confirmed: counts.confirmed ?? 0,
    registrations: rows.map((row) => ({
      email: row.email,
      status: row.status,
      confirmationSentAt: row.confirmation_sent_at,
      confirmedAt: row.confirmed_at,
      createdAt: row.created_at,
    })),
  };
}
