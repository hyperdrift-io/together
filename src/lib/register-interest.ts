import { resolve4, resolve6, resolveMx } from 'node:dns/promises';
import { sendConfirmationEmail } from './confirmation-email';
import {
  markConfirmationSent,
  startLaunchRegistration,
  validLaunchEmail,
} from './launch-registration';

const invalidEmailMessage = 'Enter a valid email address.';
const invalidDomainMessage = 'Use an email address with a valid domain.';
const permanentDnsErrors = new Set(['ENODATA', 'ENOTFOUND']);

function dnsErrorCode(error: unknown) {
  return error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'string'
    ? error.code
    : '';
}

async function hasMailAddressFallback(domain: string) {
  const results = await Promise.allSettled([
    resolve4(domain),
    resolve6(domain),
  ]);

  if (
    results.some(
      (result) => result.status === 'fulfilled' && result.value.length > 0,
    )
  ) {
    return true;
  }

  const errors = results
    .filter((result) => result.status === 'rejected')
    .map((result) => dnsErrorCode(result.reason));

  return errors.some((code) => code && !permanentDnsErrors.has(code))
    ? 'temporary-error'
    : false;
}

async function validateEmailDomain(email: string) {
  if (!validLaunchEmail(email)) {
    throw new Error(invalidEmailMessage);
  }

  const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase();

  try {
    const mxRecords = await resolveMx(domain);
    if (
      mxRecords.some(
        (record) => record.exchange && record.exchange !== '.',
      )
    ) {
      return;
    }
  } catch (error) {
    const code = dnsErrorCode(error);
    if (code && !permanentDnsErrors.has(code)) {
      return;
    }
  }

  const fallback = await hasMailAddressFallback(domain);
  if (fallback === true || fallback === 'temporary-error') {
    return;
  }

  throw new Error(invalidDomainMessage);
}

type RegistrationPreference = {
  phone?: string;
  smsOptIn?: boolean;
};

export async function registerInterest(
  email: string,
  preference: RegistrationPreference = {},
) {
  await validateEmailDomain(email);
  const registration = startLaunchRegistration(email, preference);

  if (registration.status === 'already-confirmed') {
    return { status: 'already-confirmed' as const };
  }

  await sendConfirmationEmail(registration.email, registration.token);
  markConfirmationSent(registration.email);

  return { status: 'check-email' as const };
}
