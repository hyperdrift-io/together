import type { PageProps } from 'waku/router';

export default function CheckEmailPage({
  query,
}: PageProps<'/check-email'>) {
  const alreadyConfirmed =
    new URLSearchParams(query).get('status') === 'confirmed';

  return (
    <>
      <title>
        {alreadyConfirmed ? 'You’re already in' : 'Check your inbox'} —
        Together
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page">
        <section className="message-card">
          <p className="eyebrow">
            {alreadyConfirmed ? 'You’re in' : 'One more step'}
          </p>
          <h1>
            {alreadyConfirmed
              ? 'You’re already on the list.'
              : 'Check your inbox.'}
          </h1>
          <p>
            {alreadyConfirmed
              ? 'We’ll write when Together is ready for its first real hello.'
              : 'Open the email from Together and confirm your place on the first list.'}
          </p>
          <a className="primary" href="/">
            Back to Together
          </a>
        </section>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
