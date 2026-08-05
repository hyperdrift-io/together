import type { PageProps } from 'waku/router';

import { ConfirmationTracker } from '../components/confirmation-tracker';
import { LaunchQualification } from '../components/launch-qualification';
import { LaunchPhonePreference } from '../components/launch-phone-preference';
import {
  hasCompletedLaunchQualification,
  hasLaunchPhonePreference,
  validateLaunchRegistrationToken,
} from '../lib/launch-registration';

export default function ConfirmPage({ query }: PageProps<'/confirm'>) {
  const search = new URLSearchParams(query);
  const email = search.get('email') || '';
  const token = search.get('token') || '';
  const validation = validateLaunchRegistrationToken(email, token);
  const confirmed = validation === 'already-confirmed';
  const canConfirm = validation === 'pending';
  const qualificationCompleted =
    confirmed && hasCompletedLaunchQualification(email, token);
  const phonePreferenceSaved =
    confirmed && hasLaunchPhonePreference(email, token);

  if (confirmed) {
    return (
      <>
        <title>You’re on the list — Together</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <main className="qualification-page">
          <ConfirmationTracker />
          <a
            className="qualification-wordmark"
            href="/"
            aria-label="Together home"
          >
            Together.
          </a>
          <section className="qualification-layout">
            <header className="qualification-confirmation">
              <p className="eyebrow">Confirmed</p>
              <h1>You’re in</h1>
              <p className="qualification-list-status">
                You’re on the list.
              </p>
              <p>One more spark.</p>
              {!phonePreferenceSaved ? (
                <LaunchPhonePreference email={email} token={token} />
              ) : null}
            </header>
            <LaunchQualification
              email={email}
              token={token}
              initiallyCompleted={qualificationCompleted}
            />
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <title>
        {canConfirm ? 'Confirm your place' : 'Confirmation link'} — Together
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page">
        <section className="message-card">
          <p className="eyebrow">
            {canConfirm ? 'One real signal' : 'A fresh link will help'}
          </p>
          <h1>
            {canConfirm
              ? 'Confirm your place.'
              : 'This link isn’t active.'}
          </h1>
          <p>
            {canConfirm
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
              Send a new link
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
