import { LaunchSignup } from '../components/launch-signup';

const canonicalUrl = 'https://together.hyperdrift.io/proposal';
const socialImageUrl =
  'https://together.hyperdrift.io/images/together-passing-glance-og-branded.jpg';
const description =
  'Together proposes a more human way to meet: discover mutual interest with someone already sharing the same public place, then meet face to face.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'The Together Proposal',
  url: canonicalUrl,
  description,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Together',
    url: 'https://together.hyperdrift.io/',
  },
  inLanguage: 'en-GB',
};

function PublicSquare() {
  return (
    <figure className="public-square">
      <img
        src="/images/together-proposal-public-square.png"
        alt="A lively public square where two people notice one another among the crowd."
      />
      <figcaption>
        Same place. Mutual signal. A hello that can happen now.
      </figcaption>
    </figure>
  );
}

export default function ProposalPage() {
  return (
    <>
      <title>The Together Proposal — Put Connection Back in the Room</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Together" />
      <meta
        property="og:title"
        content="Connection became a feed. Together puts it back in the room."
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Together — two people notice each other in the same social space."
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Connection belongs back in the room."
      />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImageUrl} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <main className="proposal-page" id="top">
        <header className="proposal-header">
          <a className="proposal-wordmark" href="/" aria-label="Together home">
            Together.
          </a>
          <nav aria-label="Proposal">
            <a href="#proposal">The proposal</a>
            <a href="#meeting">The outcome</a>
            <a className="primary" href="#join">
              Join Together
            </a>
          </nav>
        </header>

        <section
          className="proposal-hero"
          id="proposal"
          aria-labelledby="proposal-title"
        >
          <div>
            <p className="eyebrow">The proposal</p>
            <h1 id="proposal-title">
              Connection became a feed.
              <em>Together puts it back in the room.</em>
            </h1>
            <p className="proposal-lede">
              Meet someone who is actually there—not another profile waiting
              somewhere else.
            </p>
          </div>
          <PublicSquare />
        </section>

        <section className="proposal-statement" aria-labelledby="not-a-match">
          <p className="eyebrow">The problem is the proxy</p>
          <h2 id="not-a-match">A match is not a meeting.</h2>
          <p>
            Likes and messages can suggest possibility. The moment people came
            for still happens face to face. Together begins closer to that
            moment: with two people already sharing a place.
          </p>
        </section>

        <section className="proposal-sequence" aria-labelledby="how-it-feels">
          <header>
            <p className="eyebrow">One human movement</p>
            <h2 id="how-it-feels">Notice. Mutual. Hello.</h2>
          </header>
          <ol>
            <li>
              <strong>Notice.</strong>
              <span>You see someone you would genuinely like to meet.</span>
            </li>
            <li>
              <strong>Mutual.</strong>
              <span>Nothing moves unless the interest belongs to both of you.</span>
            </li>
            <li>
              <strong>Hello.</strong>
              <span>Together makes recognition clear enough to meet now.</span>
            </li>
          </ol>
        </section>

        <section
          className="meeting-outcome"
          id="meeting"
          aria-labelledby="meeting-title"
        >
          <div>
            <p className="eyebrow">A different incentive</p>
            <h2 id="meeting-title">We count the meeting.</h2>
            <p>
              Not time in an app. Not matches collected. Together is designed
              around the real-world outcome: a comfortable, mutually chosen
              introduction that becomes face to face.
            </p>
          </div>
          <figure className="meeting-portrait">
            <img
              src="/images/together-meeting-outcome.png"
              alt="Two adults sharing a relaxed first hello in a lively public social space."
            />
            <figcaption>Presence. Mutual signal. Recognition. Hello.</figcaption>
          </figure>
        </section>

        <section className="demand-gate" aria-labelledby="demand-title">
          <figure className="demand-gathering">
            <img
              src="/images/together-demand-gathering.png"
              alt="A public square gradually filling with people at dusk."
            />
          </figure>
          <div>
            <p className="eyebrow">Demand before software</p>
            <h2 id="demand-title">We build when the demand is real.</h2>
            <p>
              Together is still a proposal. We are gathering confirmed interest
              before building the product—because connection deserves more than
              another app launched on optimism alone.
            </p>
          </div>
        </section>

        <section className="proposal-join" id="join" aria-labelledby="join-title">
          <div>
            <p className="eyebrow">Bring it into the room</p>
            <h2 id="join-title">Join Together.</h2>
            <p>
              One email helps decide whether this becomes real. If it does,
              you’ll be among the first to know.
            </p>
          </div>
          <LaunchSignup />
        </section>

        <footer className="proposal-footer">
          <a className="proposal-wordmark" href="#top">
            Together.
          </a>
          <nav aria-label="Footer">
            <a href="/">Home</a>
            <a href="/privacy">Privacy</a>
            <a href="mailto:yann@hyperdrift.io">Contact</a>
          </nav>
        </footer>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
