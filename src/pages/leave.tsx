import type { PageProps } from 'waku/router';

import { validateRemovalToken } from '../lib/launch-registration';

export default function LeavePage({ query }: PageProps<'/leave'>) {
  const search = new URLSearchParams(query);
  const email = search.get('email') || '';
  const token = search.get('token') || '';
  const removed = search.get('status') === 'removed';
  const canRemove = !removed && validateRemovalToken(email, token);

  return (
    <>
      <title>{removed ? 'You’ve left the list' : 'Leave Together'} — Together</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page">
        <section className="message-card">
          <p className="eyebrow">
            {removed
              ? 'All done'
              : canRemove
                ? 'Your choice'
                : 'This link isn’t active'}
          </p>
          <h1>
            {removed
              ? 'You’ve left the list.'
              : canRemove
                ? 'Leave the list?'
                : 'Nothing was changed.'}
          </h1>
          <p>
            {removed
              ? 'Your email has been removed from Together’s launch registrations.'
              : canRemove
                ? 'Your registration will be removed immediately.'
                : 'The link may already have been used. No registration was changed.'}
          </p>
          {canRemove ? (
            <form action="/api/leave-interest" method="post">
              <input name="email" type="hidden" value={email} />
              <input name="token" type="hidden" value={token} />
              <button className="primary" type="submit">
                Remove my email
              </button>
            </form>
          ) : (
            <a className="primary" href="/">
              Back to Together
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
