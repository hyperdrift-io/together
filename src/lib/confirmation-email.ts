import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import nodemailer from 'nodemailer';

type ConfirmationEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  confirmationUrl: string;
  leaveUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function siteUrl() {
  return (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

function confirmationEmail(email: string, token: string): ConfirmationEmail {
  const confirmationUrl = `${siteUrl()}/confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  const leaveUrl = `${siteUrl()}/leave?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  const safeUrl = escapeHtml(confirmationUrl);
  const safeLeaveUrl = escapeHtml(leaveUrl);

  return {
    to: email,
    subject: 'Confirm your place on Together',
    confirmationUrl,
    leaveUrl,
    text: [
      'One more step.',
      '',
      'Confirm your place on the first Together list:',
      confirmationUrl,
      '',
      'Together helps people already in the same place discover when the feeling is mutual—and meet face to face.',
      '',
      `If you did not ask to join or want to leave the list: ${leaveUrl}`,
    ].join('\n'),
    html: `
      <div style="background:#061521;color:#fffaf0;font-family:Arial,sans-serif;padding:32px">
        <p style="color:#f4b544;font-size:40px;font-weight:800;margin:0 0 28px">Together.</p>
        <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:400;margin:0 0 16px">One more step.</h1>
        <p style="color:#c8c1b7;line-height:1.6;margin:0 0 24px">Confirm your place on the first Together list.</p>
        <p style="margin:0 0 28px"><a href="${safeUrl}" style="background:#f4b544;color:#020a10;display:inline-block;font-weight:800;padding:14px 20px;text-decoration:none">Confirm my place</a></p>
        <p style="color:#c8c1b7;font-size:13px;line-height:1.6;margin:0 0 16px">Together helps people already in the same place discover when the feeling is mutual—and meet face to face.</p>
        <p style="color:#c8c1b7;font-size:12px;line-height:1.6;margin:0"><a href="${safeLeaveUrl}" style="color:#c8c1b7">I did not ask to join or want to leave the list</a></p>
      </div>
    `.trim(),
  };
}

async function writeToTestOutbox(message: ConfirmationEmail) {
  if (process.env.TOGETHER_ALLOW_FILE_EMAIL !== '1') {
    throw new Error('File email transport is not enabled.');
  }

  const outboxPath = resolve(
    process.env.TOGETHER_OUTBOX_PATH || 'data/test-outbox.jsonl',
  );
  await mkdir(dirname(outboxPath), { recursive: true });
  await appendFile(
    outboxPath,
    `${JSON.stringify({ ...message, sentAt: new Date().toISOString() })}\n`,
    'utf8',
  );
}

async function sendWithSmtp(message: ConfirmationEmail) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM;

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !user ||
    !password ||
    !from
  ) {
    throw new Error('Confirmation email is not configured.');
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure:
      process.env.SMTP_SECURE === 'true' ||
      (process.env.SMTP_SECURE !== 'false' && port === 465),
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transport.sendMail({
    from,
    replyTo: process.env.EMAIL_REPLY_TO || undefined,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    headers: {
      'List-Unsubscribe': `<${message.leaveUrl}>`,
    },
  });
}

export async function sendConfirmationEmail(email: string, token: string) {
  const message = confirmationEmail(email, token);

  if (process.env.TOGETHER_EMAIL_TRANSPORT === 'file') {
    await writeToTestOutbox(message);
    return;
  }

  await sendWithSmtp(message);
}
