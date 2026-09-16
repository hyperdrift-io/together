import { type Locale, localePath } from '../lib/locale';
import { pilotAppUrl } from '../lib/pilot-app';
import { LaunchProgress } from './launch-progress';
import { LaunchSignup } from './launch-signup';
import { LaunchSurveyDialog } from './launch-survey-dialog';
import { ShareTogether } from './share-together';

const origin = 'https://together.hyperdrift.io';
const socialImageUrl = `${origin}/images/together-passing-glance-og-branded.jpg`;
const englishUrl = `${origin}/`;
const frenchUrl = `${origin}/fr`;

const copy = {
  en: {
    url: englishUrl,
    htmlLang: 'en-GB',
    ogLocale: 'en_GB',
    ogLocaleAlternate: 'fr_FR',
    title: 'Together — Meet Someone Already Here, Face to Face',
    description:
      'Together helps people already in the same public place discover mutual interest and meet face to face. Join the London launch list.',
    socialTitle: 'Look up. They’re here.',
    socialDescription: 'Meet someone who is already there, face to face.',
    imageAlt:
      'Together — Look up. They’re here. Two people notice each other at a social event.',
    home: 'Together home',
    tagline: 'Face to face. Already here.',
    proposal: 'Read the proposal',
    signIn: 'Sign in',
    switchLabel: 'Français',
    switchLang: 'fr',
    switchHref: '/fr',
    liveTag: 'Live now',
    liveBody:
      'A first small group is already using the app. The next invitations go to this list.',
    eyebrow: 'A real connection, in the real world',
    heading: 'Look up.',
    headingSpark: 'They’re here.',
    lede: 'Together helps people already in the same place discover when the feeling is mutual—and meet face to face.',
    openApp: 'Already invited? Open the app',
    close: 'Come. Spark. Connect.',
  },
  fr: {
    url: frenchUrl,
    htmlLang: 'fr-FR',
    ogLocale: 'fr_FR',
    ogLocaleAlternate: 'en_GB',
    title: 'Together — Rencontre quelqu’un qui est déjà là, en vrai',
    description:
      'Together aide les personnes qui sont déjà au même endroit à savoir quand l’attirance est réciproque, et à se rencontrer en vrai. Rejoins la liste France.',
    socialTitle: 'Lève les yeux. Quelqu’un est déjà là.',
    socialDescription: 'Rencontre quelqu’un qui est déjà là, en face à face.',
    imageAlt:
      'Together — Lève les yeux. Deux personnes se remarquent pendant une soirée.',
    home: 'Accueil Together',
    tagline: 'En face à face. Déjà là.',
    proposal: 'Lire la proposition (EN)',
    signIn: 'Se connecter',
    switchLabel: 'English',
    switchLang: 'en',
    switchHref: '/',
    liveTag: 'Déjà en ligne',
    liveBody:
      'Un premier petit groupe utilise déjà l’appli. Les prochaines invitations partent de cette liste.',
    eyebrow: 'Une vraie rencontre, dans la vraie vie',
    heading: 'Lève les yeux.',
    headingSpark: 'Quelqu’un est déjà là.',
    lede: 'Together t’aide à savoir quand l’attirance est réciproque avec quelqu’un qui est au même endroit que toi, et à te lancer pour un vrai bonjour.',
    openApp: 'Déjà invité·e ? Ouvre l’appli',
    close: 'Viens. Ose. Rencontre.',
  },
};

function structuredData(locale: Locale) {
  const t = copy[locale];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${englishUrl}#website`,
        name: 'Together',
        url: englishUrl,
        inLanguage: ['en-GB', 'fr-FR'],
      },
      {
        '@type': 'WebPage',
        '@id': `${t.url}#webpage`,
        url: t.url,
        name: t.title,
        description: t.description,
        isPartOf: { '@id': `${englishUrl}#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: socialImageUrl,
          width: 1200,
          height: 630,
        },
        inLanguage: t.htmlLang,
      },
    ],
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <>
      <title>{t.title}</title>
      <meta name="description" content={t.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta
        name="googlebot"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={t.ogLocale} />
      <meta property="og:locale:alternate" content={t.ogLocaleAlternate} />
      <meta property="og:site_name" content="Together" />
      <meta property="og:title" content={t.socialTitle} />
      <meta property="og:description" content={t.socialDescription} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:secure_url" content={socialImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t.imageAlt} />
      <meta property="og:url" content={t.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.socialTitle} />
      <meta name="twitter:description" content={t.socialDescription} />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:image:alt" content={t.imageAlt} />
      <link rel="canonical" href={t.url} />
      <link rel="alternate" hrefLang="en-GB" href={englishUrl} />
      <link rel="alternate" hrefLang="fr-FR" href={frenchUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(locale)).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />

      <main id="top" lang={t.htmlLang}>
        <section className="hero" aria-labelledby="hero-title">
          <header className="site-header">
            <a
              className="wordmark"
              href={localePath(locale, '/')}
              aria-label={t.home}
            >
              Together.
            </a>
            <div className="site-header-links">
              <p>{t.tagline}</p>
              <a href="/proposal" hrefLang="en">
                {t.proposal}
              </a>
              <a href={pilotAppUrl}>{t.signIn}</a>
              <a href={t.switchHref} hrefLang={t.switchLang} lang={t.switchLang}>
                {t.switchLabel}
              </a>
            </div>
          </header>

          <div className="hero-scene" aria-hidden="true" />

          <div className="hero-copy">
            <p className="live-now">
              <b>{t.liveTag}</b> {t.liveBody}
            </p>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 id="hero-title">
              {t.heading}
              <em>{t.headingSpark}</em>
            </h1>
            <p className="lede">{t.lede}</p>
            <LaunchProgress market={locale} />
            <LaunchSignup market={locale} />
            <p className="hero-actions">
              <a href={pilotAppUrl}>{t.openApp}</a>
              {locale === 'en' ? (
                <a className="survey-link" href="#survey">
                  Help shape the first room · 60 seconds
                </a>
              ) : null}
            </p>
          </div>

          <footer className="hero-close">
            <p>{t.close}</p>
          </footer>
        </section>

        {/* The survey asks about London areas, so it stays on the English page. */}
        {locale === 'en' ? (
          <section className="public-survey" aria-labelledby="shape-title">
            <div>
              <p className="eyebrow">Help shape the first room</p>
              <h2 id="shape-title">Where should Together begin?</h2>
              <p>
                Three optional answers help us find the first public places
                where a real hello could happen.
              </p>
            </div>
            <a className="primary" href="#survey">
              Answer three questions
            </a>
            <LaunchSurveyDialog />
          </section>
        ) : null}

        <ShareTogether locale={locale} />
      </main>
    </>
  );
}
