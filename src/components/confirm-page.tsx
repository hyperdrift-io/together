import {
  hasCompletedLaunchQualification,
  hasLaunchPhonePreference,
  validateLaunchRegistrationToken,
} from '../lib/launch-registration';
import { type Locale, localePath } from '../lib/locale';
import { ConfirmationTracker } from './confirmation-tracker';
import { LaunchPhonePreference } from './launch-phone-preference';
import { LaunchQualification } from './launch-qualification';

const copy = {
  en: {
    confirmedTitle: 'You’re on the list',
    home: 'Together home',
    confirmedEyebrow: 'Confirmed',
    confirmedHeading: 'You’re in',
    listStatus: 'You’re on the list.',
    nextStep: 'One more spark.',
    confirmTitle: 'Confirm your place',
    inactiveTitle: 'Confirmation link',
    confirmEyebrow: 'One real signal',
    inactiveEyebrow: 'A fresh link will help',
    confirmHeading: 'Confirm your place.',
    inactiveHeading: 'This link isn’t active.',
    confirmBody:
      'Confirm that you want Together to become a real face-to-face meeting app.',
    inactiveBody:
      'Return to the landing page and enter your email again to receive a new confirmation link.',
    confirm: 'Confirm my place',
    newLink: 'Send a new link',
  },
  fr: {
    confirmedTitle: 'Tu es sur la liste',
    home: 'Accueil Together',
    confirmedEyebrow: 'Confirmé',
    confirmedHeading: 'C’est bon',
    listStatus: 'Tu es sur la liste France.',
    nextStep:
      'On t’écrit dès que la première salle ouvre. D’ici là, fais passer le mot.',
    confirmTitle: 'Confirme ta place',
    inactiveTitle: 'Lien de confirmation',
    confirmEyebrow: 'Un vrai signal',
    inactiveEyebrow: 'Un nouveau lien va aider',
    confirmHeading: 'Confirme ta place.',
    inactiveHeading: 'Ce lien n’est plus actif.',
    confirmBody:
      'Confirme que tu veux voir Together devenir une vraie appli de rencontres en face à face.',
    inactiveBody:
      'Reviens sur la page d’accueil et saisis ton e-mail pour recevoir un nouveau lien.',
    confirm: 'Confirmer ma place',
    newLink: 'Recevoir un nouveau lien',
  },
};

type ConfirmPageProps = {
  query: string;
  locale: Locale;
};

export function ConfirmPage({ query, locale }: ConfirmPageProps) {
  const t = copy[locale];
  const home = localePath(locale, '/');
  const search = new URLSearchParams(query);
  const email = search.get('email') || '';
  const token = search.get('token') || '';
  const validation = validateLaunchRegistrationToken(email, token);
  const confirmed = validation === 'already-confirmed';
  const canConfirm = validation === 'pending';

  if (confirmed) {
    // The phone and qualification follow-ups are London-only for now.
    const london = locale === 'en';
    const qualificationCompleted =
      london && hasCompletedLaunchQualification(email, token);
    const phonePreferenceSaved =
      !london || hasLaunchPhonePreference(email, token);

    return (
      <>
        <title>{`${t.confirmedTitle} — Together`}</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <main className="qualification-page" lang={locale}>
          <ConfirmationTracker market={locale} />
          <a className="qualification-wordmark" href={home} aria-label={t.home}>
            Together.
          </a>
          <section className="qualification-layout">
            <header className="qualification-confirmation">
              <p className="eyebrow">{t.confirmedEyebrow}</p>
              <h1>{t.confirmedHeading}</h1>
              <p className="qualification-list-status">{t.listStatus}</p>
              <p>{t.nextStep}</p>
              {!phonePreferenceSaved ? (
                <LaunchPhonePreference email={email} token={token} />
              ) : null}
            </header>
            {london ? (
              <LaunchQualification
                email={email}
                token={token}
                initiallyCompleted={qualificationCompleted}
              />
            ) : null}
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <title>
        {`${canConfirm ? t.confirmTitle : t.inactiveTitle} — Together`}
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page" lang={locale}>
        <section className="message-card">
          <p className="eyebrow">
            {canConfirm ? t.confirmEyebrow : t.inactiveEyebrow}
          </p>
          <h1>{canConfirm ? t.confirmHeading : t.inactiveHeading}</h1>
          <p>{canConfirm ? t.confirmBody : t.inactiveBody}</p>
          {canConfirm ? (
            <form action="/api/confirm-interest" method="post">
              <input name="email" type="hidden" value={email} />
              <input name="token" type="hidden" value={token} />
              <button className="primary" type="submit">
                {t.confirm}
              </button>
            </form>
          ) : (
            <a className="primary" href={home}>
              {t.newLink}
            </a>
          )}
        </section>
      </main>
    </>
  );
}
