import { LaunchProgress } from '../components/launch-progress';
import { LaunchSignup } from '../components/launch-signup';
import { LaunchSurveyDialog } from '../components/launch-survey-dialog';
import { PilotLink } from '../components/pilot-link';
import { PilotPreview } from '../components/pilot-preview';
import { ShareTogether } from '../components/share-together';

const canonicalUrl = 'https://together.hyperdrift.io/';
const socialImageUrl =
  'https://together.hyperdrift.io/images/together-passing-glance-og-branded.jpg';
const description =
  'Together helps people already in the same public place discover mutual interest and meet face to face. Join the London launch list.';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${canonicalUrl}#website`,
      name: 'Together',
      url: canonicalUrl,
      description,
      inLanguage: 'en-GB',
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Together — Meet Someone Already Here, Face to Face',
      description,
      isPartOf: { '@id': `${canonicalUrl}#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: socialImageUrl,
        width: 1200,
        height: 630,
      },
      inLanguage: 'en-GB',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <title>Together — Meet Someone Already Here, Face to Face</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta
        name="googlebot"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Together" />
      <meta property="og:title" content="Look up. They’re here." />
      <meta
        property="og:description"
        content="Meet someone who is already there, face to face."
      />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:secure_url" content={socialImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Together — Look up. They’re here. Two people notice each other at a social event."
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Look up. They’re here." />
      <meta
        name="twitter:description"
        content="Meet someone who is already there, face to face."
      />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta
        name="twitter:image:alt"
        content="Together — Look up. They’re here."
      />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <header className="site-header">
            <a className="wordmark" href="#top" aria-label="Together home">
              Together.
            </a>
            <div className="site-header-links">
              <p>Face to face. Already here.</p>
              <a href="/proposal">Read the proposal</a>
              <PilotLink className="pilot-signin" placement="header">
                Sign in
              </PilotLink>
            </div>
          </header>

          <div className="hero-scene" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow">A real connection, in the real world</p>
            <h1 id="hero-title">
              Look up.
              <em>They’re here.</em>
            </h1>
            <p className="lede">
              Together helps people already in the same place discover when the
              feeling is mutual—and meet face to face.
            </p>
            <p className="status-note">
              The pilot app is live with a first small group in London. Join
              the list and you are invited next.
            </p>
            <LaunchProgress />
            <LaunchSignup />
            <a className="survey-link" href="#survey">
              Help shape the first room · 60 seconds
            </a>
          </div>

          <footer className="hero-close">
            <p>Come. Spark. Connect.</p>
          </footer>
        </section>

        <PilotPreview />

        <section className="public-survey" aria-labelledby="shape-title">
          <div>
            <p className="eyebrow">Help shape the first room</p>
            <h2 id="shape-title">Where should Together begin?</h2>
            <p>
              Three optional answers help us find the first public places where
              a real hello could happen.
            </p>
          </div>
          <a className="primary" href="#survey">
            Answer three questions
          </a>
          <LaunchSurveyDialog />
        </section>

        <ShareTogether />

        <section className="join-again" aria-labelledby="join-again-title">
          <p className="eyebrow">Your place is next</p>
          <h2 id="join-again-title">Be in the room when it opens.</h2>
          <a className="primary" href="#join">
            Join the London list
          </a>
        </section>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
