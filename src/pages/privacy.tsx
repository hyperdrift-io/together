export default function PrivacyPage() {
  return (
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
        <h2>Why we use it</h2>
        <p>
          We use your email to confirm your interest, understand whether there
          is enough demand to build Together, and send relevant launch updates.
          We do not sell your address or use it to create a dating profile.
        </p>
        <h2>Analytics</h2>
        <p>
          We measure visits and registration events without sending your email
          address to analytics. This helps us decide whether the idea deserves
          to become a product.
        </p>
        <h2>Your choice</h2>
        <p>
          Every confirmation email includes a link to leave the list. We keep
          confirmed registrations while Together remains under active
          validation, then remove them if the project does not continue.
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
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
