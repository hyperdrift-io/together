import { type Locale, localePath } from '../lib/locale';

const copy = {
  en: {
    confirmedTitle: 'You’re already in',
    pendingTitle: 'Check your inbox',
    confirmedEyebrow: 'You’re in',
    pendingEyebrow: 'One more step',
    confirmedHeading: 'You’re already on the list.',
    pendingHeading: 'Check your inbox.',
    confirmedBody: 'We’ll write when Together is ready for its first real hello.',
    pendingBody:
      'Open the email from Together and confirm your place on the first list.',
    back: 'Back to Together',
  },
  fr: {
    confirmedTitle: 'Tu es déjà inscrit·e',
    pendingTitle: 'Regarde ta boîte mail',
    confirmedEyebrow: 'C’est fait',
    pendingEyebrow: 'Plus qu’une étape',
    confirmedHeading: 'Tu es déjà sur la liste.',
    pendingHeading: 'Regarde ta boîte mail.',
    confirmedBody:
      'On t’écrit dès que Together est prêt pour un premier vrai bonjour en France.',
    pendingBody:
      'Ouvre l’e-mail de Together et confirme ta place sur la première liste française.',
    back: 'Retour à Together',
  },
};

type CheckEmailPageProps = {
  query: string;
  locale: Locale;
};

export function CheckEmailPage({ query, locale }: CheckEmailPageProps) {
  const t = copy[locale];
  const alreadyConfirmed =
    new URLSearchParams(query).get('status') === 'confirmed';

  return (
    <>
      <title>
        {`${alreadyConfirmed ? t.confirmedTitle : t.pendingTitle} — Together`}
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page" lang={locale}>
        <section className="message-card">
          <p className="eyebrow">
            {alreadyConfirmed ? t.confirmedEyebrow : t.pendingEyebrow}
          </p>
          <h1>{alreadyConfirmed ? t.confirmedHeading : t.pendingHeading}</h1>
          <p>{alreadyConfirmed ? t.confirmedBody : t.pendingBody}</p>
          <a className="primary" href={localePath(locale, '/')}>
            {t.back}
          </a>
        </section>
      </main>
    </>
  );
}
