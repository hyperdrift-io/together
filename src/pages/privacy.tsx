export default function PrivacyPage() {
  return (
    <>
      <title>Privacy — Together</title>
      <meta
        name="description"
        content="How Together uses and protects launch-list registrations and optional pilot qualification answers."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://together.hyperdrift.io/privacy" />
      <main className="legal-page">
        <article className="legal-card">
          <a className="wordmark" href="/" aria-label="Together home">
            Together.
          </a>
          <p className="eyebrow">Privacy</p>
          <h1>Your email stays close.</h1>
          <p>
            Together is currently a demand test by Hyperdrift. We collect the
            email address you choose to share, whether you confirmed it, and the
            timestamps needed to operate the launch list.
          </p>
          <h2>Optional pilot questions</h2>
          <p>
            You can optionally tell us the kind of shared place where Together
            feels most natural, the broad part of London where you spend social
            time, and whether you are 18 or over. You can share these answers
            anonymously, or add your email to join the list. We use them to
            understand where an adult London pilot could work. They do not
            create a dating profile or affect your place on the launch list.
          </p>
          <p>
            Anonymous survey answers are tied only to a random browser ID and
            are removed after 30 days. If you add an email and confirm it, we
            keep the answers with your launch-list registration instead.
          </p>
          <h2>Why we use it</h2>
          <p>
            We use your email to confirm your interest, understand whether there
            is enough demand to build Together, and send relevant launch updates.
            We do not sell your address or use it to create a dating profile.
          </p>
          <h2>Analytics</h2>
          <p>
            We measure visits and registration events without sending your email
            address or qualification answers to analytics. This helps us decide
            whether the idea deserves to become a product.
          </p>
          <h2>Your choice</h2>
          <p>
            Every confirmation email includes a link to leave the list. We keep
            confirmed registrations and any optional qualification answers
            together while Together remains under active validation. Leaving the
            list removes both. We remove them if the project does not continue.
          </p>
          <p>
            For questions or a deletion request, email{' '}
            <a href="mailto:yann@hyperdrift.io">yann@hyperdrift.io</a>.
          </p>
          <a className="primary" href="/">
            Back to Together
          </a>
        </article>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
