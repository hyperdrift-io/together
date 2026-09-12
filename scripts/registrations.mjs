#!/usr/bin/env node
// Operator maintenance for the launch-registration store. Runs on the server
// against TOGETHER_DATA_PATH (the same SQLite file the app reads), so the
// homepage counter and /admin reflect the change on the next request.
//
//   node scripts/registrations.mjs list
//   node scripts/registrations.mjs remove <email> [<email> ...]
//
// `remove` deletes the registration and, through the schema's foreign keys,
// its qualification and survey answers. Use it to drop test sign-ups so only
// real people count towards the first room.

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const [command, ...emails] = process.argv.slice(2);
const path = resolve(
  process.env.TOGETHER_DATA_PATH || 'data/together-registrations.sqlite',
);

if (!existsSync(path)) {
  console.error(`No registration store at ${path}. Set TOGETHER_DATA_PATH.`);
  process.exit(1);
}

const db = new DatabaseSync(path);
db.exec('PRAGMA foreign_keys = ON');

function normalizedEmail(value) {
  return value.normalize('NFKC').trim().toLowerCase();
}

if (command === 'list') {
  const rows = db
    .prepare(
      'SELECT email, status, created_at, confirmed_at FROM launch_registrations ORDER BY created_at DESC',
    )
    .all();
  const confirmed = rows.filter((row) => row.status === 'confirmed').length;

  for (const row of rows) {
    console.log(
      `${row.status.padEnd(9)} ${row.email}  registered ${row.created_at}${
        row.confirmed_at ? `  confirmed ${row.confirmed_at}` : ''
      }`,
    );
  }
  console.log(`\n${rows.length} registrations, ${confirmed} confirmed.`);
} else if (command === 'remove' && emails.length) {
  const remove = db.prepare('DELETE FROM launch_registrations WHERE email = ?');

  for (const raw of emails) {
    const email = normalizedEmail(raw);
    const { changes } = remove.run(email);
    console.log(changes ? `removed ${email}` : `not found ${email}`);
  }

  const { confirmed } = db
    .prepare(
      "SELECT COUNT(*) AS confirmed FROM launch_registrations WHERE status = 'confirmed'",
    )
    .get();
  console.log(`\n${confirmed} confirmed registrations remain on the first list.`);
} else {
  console.error(
    'Usage: node scripts/registrations.mjs list | remove <email> [<email> ...]',
  );
  process.exit(2);
}

db.close();
