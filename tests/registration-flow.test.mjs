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
  const email = 'first.hello@example.com';
  const landingResponse = await fetch(baseUrl);
  const landingHtml = await landingResponse.text();

  assert.equal(landingResponse.status, 200);
  assert.match(landingHtml, /Look up\./);
  assert.match(landingHtml, /action="\/api\/launch-interest"/);

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
