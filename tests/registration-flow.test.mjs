import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { after, before, test } from 'node:test';

const projectDirectory = new URL('..', import.meta.url).pathname;
const testDirectory = await mkdtemp(join(tmpdir(), 'together-registration-'));
const databasePath = join(testDirectory, 'registrations.sqlite');
const outboxPath = join(testDirectory, 'outbox.jsonl');
const port = 45_000 + Math.floor(Math.random() * 1_000);
const baseUrl = `http://127.0.0.1:${port}`;
let server;
let serverOutput = '';

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  throw new Error(`Together did not start.\n${serverOutput}`);
}

before(async () => {
  server = spawn(
    'pnpm',
    ['exec', 'waku', 'dev', '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: projectDirectory,
      env: {
        ...process.env,
        SITE_URL: baseUrl,
        TOGETHER_ALLOW_FILE_EMAIL: '1',
        TOGETHER_DATA_PATH: databasePath,
        TOGETHER_EMAIL_TRANSPORT: 'file',
        TOGETHER_OUTBOX_PATH: outboxPath,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
  server.stdout.on('data', (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on('data', (chunk) => {
    serverOutput += chunk;
  });
  await waitForServer();
});

after(async () => {
  server?.kill('SIGTERM');
  await rm(testDirectory, { recursive: true, force: true });
});

test('a visitor registers on the landing page, receives the confirmation email, and confirms', async () => {
  const email = 'first.hello@hyperdrift.io';
  const landingResponse = await fetch(baseUrl);
  const landingHtml = await landingResponse.text();

  assert.equal(landingResponse.status, 200);
  assert.match(landingHtml, /Look up\./);
  assert.match(landingHtml, /action="\/api\/launch-interest"/);
  assert.match(
    landingHtml,
    /together-passing-glance-og-branded\.jpg/,
  );
  assert.match(landingHtml, /application\/ld\+json/);
  assert.match(landingHtml, /Meet Someone Already Here, Face to Face/);

  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email }),
      redirect: 'manual',
    },
  );

  assert.equal(registrationResponse.status, 303);
  assert.equal(
    new URL(registrationResponse.headers.get('location')).pathname,
    '/check-email',
  );

  const outbox = await readFile(outboxPath, 'utf8');
  const message = JSON.parse(outbox.trim());

  assert.equal(message.to, email);
  assert.equal(message.subject, 'Confirm your place on Together');
  assert.match(message.text, /Confirm your place on the first Together list/);
  assert.match(message.leaveUrl, /^http:\/\/127\.0\.0\.1:\d+\/leave\?/);

  const leavePreviewResponse = await fetch(message.leaveUrl);
  const leavePreviewHtml = await leavePreviewResponse.text();
  assert.equal(leavePreviewResponse.status, 200);
  assert.match(leavePreviewHtml, /Leave the list\?/);

  const pendingDatabase = new DatabaseSync(databasePath);
  const pending = pendingDatabase
    .prepare(
      'SELECT status, confirmation_sent_at FROM launch_registrations WHERE email = ?',
    )
    .get(email);
  pendingDatabase.close();

  assert.equal(pending.status, 'pending');
  assert.ok(pending.confirmation_sent_at);

  const confirmationResponse = await fetch(message.confirmationUrl);
  const confirmationHtml = await confirmationResponse.text();

  assert.equal(confirmationResponse.status, 200);
  assert.match(confirmationHtml, /Confirm your place\./);
  assert.match(confirmationHtml, /action="\/api\/confirm-interest"/);

  const confirmationUrl = new URL(message.confirmationUrl);
  const confirmationPostResponse = await fetch(
    `${baseUrl}/api/confirm-interest`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: confirmationUrl.searchParams.get('email'),
        token: confirmationUrl.searchParams.get('token'),
      }),
      redirect: 'manual',
    },
  );

  assert.equal(confirmationPostResponse.status, 303);
  const completionUrl = confirmationPostResponse.headers.get('location');
  assert.equal(new URL(completionUrl).pathname, '/confirm');
  assert.equal(new URL(completionUrl).searchParams.get('status'), 'confirmed');

  const completionResponse = await fetch(completionUrl);
  const completionHtml = await completionResponse.text();
  assert.equal(completionResponse.status, 200);
  assert.match(completionHtml, /You’re on the list\./);
  assert.match(completionHtml, /Where would you most naturally use Together\?/);
  assert.match(completionHtml, /60 seconds · Optional/);

  const confirmedDatabase = new DatabaseSync(databasePath);
  const confirmed = confirmedDatabase
    .prepare(
      'SELECT status, confirmed_at FROM launch_registrations WHERE email = ?',
    )
    .get(email);
  confirmedDatabase.close();

  assert.equal(confirmed.status, 'confirmed');
  assert.ok(confirmed.confirmed_at);
});

test('the registration API has an explicit method contract and JSON success path', async () => {
  const methodResponse = await fetch(`${baseUrl}/api/launch-interest`);
  const methodPayload = await methodResponse.json();

  assert.equal(methodResponse.status, 405);
  assert.equal(methodResponse.headers.get('allow'), 'POST');
  assert.match(methodPayload.message, /Submit the registration form/);

  const email = 'json.hello@hyperdrift.io';
  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, company: '' }),
    },
  );
  const payload = await registrationResponse.json();

  assert.equal(registrationResponse.status, 202);
  assert.deepEqual(payload, { status: 'check-email' });

  const db = new DatabaseSync(databasePath);
  const registration = db
    .prepare(
      'SELECT status, confirmation_sent_at FROM launch_registrations WHERE email = ?',
    )
    .get(email);
  db.close();

  assert.equal(registration.status, 'pending');
  assert.ok(registration.confirmation_sent_at);
});

test('the registration API accepts browser-style multipart submissions', async () => {
  const email = 'multipart.hello@hyperdrift.io';
  const body = new FormData();
  body.set('email', email);
  body.set('company', '');

  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ZGV2OmRldg==',
        Origin: 'https://together.hyperdrift.io',
      },
      body,
    },
  );
  const payload = await registrationResponse.json();

  assert.equal(registrationResponse.status, 202);
  assert.deepEqual(payload, { status: 'check-email' });

  const db = new DatabaseSync(databasePath);
  const registration = db
    .prepare(
      'SELECT status, confirmation_sent_at FROM launch_registrations WHERE email = ?',
    )
    .get(email);
  db.close();

  assert.equal(registration.status, 'pending');
  assert.ok(registration.confirmation_sent_at);
});

test('the public survey accepts anonymous answers and links email-backed answers after confirmation', async () => {
  const methodResponse = await fetch(`${baseUrl}/api/launch-survey`);
  assert.equal(methodResponse.status, 405);
  assert.equal(methodResponse.headers.get('allow'), 'POST');

  const anonymousResponse = await fetch(`${baseUrl}/api/launch-survey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: 'anonymous-survey-visitor-0001',
      placeType: 'gig',
      londonArea: 'east',
      adultEligibility: 'yes',
    }),
  });

  assert.equal(anonymousResponse.status, 200);
  assert.deepEqual(await anonymousResponse.json(), { status: 'saved' });

  const anonymousDatabase = new DatabaseSync(databasePath);
  const anonymousAnswer = anonymousDatabase
    .prepare(
      'SELECT email, place_type, london_area, adult_eligible FROM launch_survey_responses',
    )
    .get();
  anonymousDatabase.close();

  assert.equal(anonymousAnswer.email, null);
  assert.equal(anonymousAnswer.place_type, 'gig');
  assert.equal(anonymousAnswer.london_area, 'east');
  assert.equal(anonymousAnswer.adult_eligible, 1);

  const email = 'survey.hello@hyperdrift.io';
  const emailResponse = await fetch(`${baseUrl}/api/launch-survey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId: 'email-survey-visitor-00000001',
      email,
      placeType: 'class_club',
      londonArea: 'north',
      adultEligibility: 'yes',
    }),
  });

  assert.equal(emailResponse.status, 200);
  assert.deepEqual(await emailResponse.json(), { status: 'check-email' });

  const messages = (await readFile(outboxPath, 'utf8'))
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line));
  const message = messages.at(-1);
  const confirmationUrl = new URL(message.confirmationUrl);

  const confirmationResponse = await fetch(
    `${baseUrl}/api/confirm-interest`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        email: confirmationUrl.searchParams.get('email'),
        token: confirmationUrl.searchParams.get('token'),
      }),
      redirect: 'manual',
    },
  );

  assert.equal(confirmationResponse.status, 303);

  const linkedDatabase = new DatabaseSync(databasePath);
  const qualification = linkedDatabase
    .prepare(
      'SELECT place_type, london_area, adult_eligible FROM launch_qualifications WHERE email = ?',
    )
    .get(email);
  const pendingSurvey = linkedDatabase
    .prepare('SELECT 1 AS found FROM launch_survey_responses WHERE email = ?')
    .get(email);
  linkedDatabase.close();

  assert.equal(qualification.place_type, 'class_club');
  assert.equal(qualification.london_area, 'north');
  assert.equal(qualification.adult_eligible, 1);
  assert.equal(pendingSurvey, undefined);
});

test('the registration API rejects an email domain that cannot receive mail', async () => {
  const email = 'hello@definitely-not-a-domain.invalid';
  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, company: '' }),
    },
  );
  const payload = await registrationResponse.json();

  assert.equal(registrationResponse.status, 400);
  assert.deepEqual(payload, {
    message: 'Use an email address with a valid domain.',
  });

  const db = new DatabaseSync(databasePath);
  const registration = db
    .prepare('SELECT email FROM launch_registrations WHERE email = ?')
    .get(email);
  db.close();

  assert.equal(registration, undefined);
});

test('the registration API rejects malformed email syntax', async () => {
  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email: 'not-an-email', company: '' }),
    },
  );
  const payload = await registrationResponse.json();

  assert.equal(registrationResponse.status, 400);
  assert.deepEqual(payload, {
    message: 'Enter a valid email address.',
  });
});

test('the admin page shows registration totals and latest records', async () => {
  const email = 'admin-visible@hyperdrift.io';
  const registrationResponse = await fetch(
    `${baseUrl}/api/launch-interest`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, company: '' }),
    },
  );
  assert.equal(registrationResponse.status, 202);

  const response = await fetch(`${baseUrl}/admin`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Private launch view/);
  assert.match(html, /Registrations/);
  assert.match(html, /admin-visible@hyperdrift\.io/);
  assert.match(html, /Confirmed/);
  assert.match(html, /Pending/);
});
