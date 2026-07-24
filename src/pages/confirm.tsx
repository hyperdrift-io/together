import type { PageProps } from 'waku/router';

import { ConfirmationTracker } from '../components/confirmation-tracker';
import { validateLaunchRegistrationToken } from '../lib/launch-registration';

export default function ConfirmPage({ query }: PageProps<'/confirm'>) {
  const search = new URLSearchParams(query);
  const email = search.get('email') || '';
  const token = search.get('token') || '';
  const validation = validateLaunchRegistrationToken(email, token);
  const confirmed = validation === 'already-confirmed';
  const canConfirm = validation === 'pending';

  return (
    <>
      <title>
        {confirmed
          ? 'You’re on the list'
          : canConfirm
            ? 'Confirm your place'
            : 'Confirmation link'}{' '}
        — Together
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page">
        <section className="message-card">
          {confirmed ? <ConfirmationTracker /> : null}
          <p className="eyebrow">
            {confirmed
              ? 'Confirmed'
              : canConfirm
                ? 'One real signal'
                : 'A fresh link will help'}
          </p>
          <h1>
            {confirmed
              ? 'You’re on the list.'
              : canConfirm
                ? 'Confirm your place.'
                : 'This link isn’t active.'}
          </h1>
          <p>
            {confirmed
              ? 'Your interest is now part of the signal that decides whether Together gets built.'
              : canConfirm
                ? 'Confirm that you want Together to become a real face-to-face meeting app.'
                : 'Return to the landing page and enter your email again to receive a new confirmation link.'}
          </p>
          {canConfirm ? (
            <form action="/api/confirm-interest" method="post">
              <input name="email" type="hidden" value={email} />
              <input name="token" type="hidden" value={token} />
              <button className="primary" type="submit">
                Confirm my place
              </button>
            </form>
          ) : (
            <a className="primary" href="/">
              {confirmed ? 'Come. Spark. Connect.' : 'Send a new link'}
            </a>
          )}
        </section>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
