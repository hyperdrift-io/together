import { sendConfirmationEmail } from './confirmation-email';
import {
  markConfirmationSent,
  startLaunchRegistration,
} from './launch-registration';

export async function registerInterest(email: string) {
  const registration = startLaunchRegistration(email);

  if (registration.status === 'already-confirmed') {
    return { status: 'already-confirmed' as const };
  }

  await sendConfirmationEmail(registration.email, registration.token);
  markConfirmationSent(registration.email);

  return { status: 'check-email' as const };
}
