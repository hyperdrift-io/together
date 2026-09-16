import { validateRemovalToken } from '../lib/launch-registration';
import { type Locale, localePath } from '../lib/locale';

const copy = {
  en: {
    removedTitle: 'You’ve left the list',
    leaveTitle: 'Leave Together',
    removedEyebrow: 'All done',
    leaveEyebrow: 'Your choice',
    inactiveEyebrow: 'This link isn’t active',
    removedHeading: 'You’ve left the list.',
    leaveHeading: 'Leave the list?',
    inactiveHeading: 'Nothing was changed.',
    removedBody:
      'Your email has been removed from Together’s launch registrations.',
    leaveBody: 'Your registration will be removed immediately.',
    inactiveBody:
      'The link may already have been used. No registration was changed.',
    remove: 'Remove my email',
    back: 'Back to Together',
  },
  fr: {
    removedTitle: 'Tu as quitté la liste',
    leaveTitle: 'Quitter Together',
    removedEyebrow: 'C’est fait',
    leaveEyebrow: 'À toi de voir',
    inactiveEyebrow: 'Ce lien n’est plus actif',
    removedHeading: 'Tu as quitté la liste.',
    leaveHeading: 'Quitter la liste ?',
    inactiveHeading: 'Rien n’a changé.',
    removedBody:
      'Ton e-mail a été retiré des inscriptions au lancement de Together.',
    leaveBody: 'Ton inscription sera supprimée tout de suite.',
    inactiveBody:
      'Le lien a peut-être déjà servi. Aucune inscription n’a été modifiée.',
    remove: 'Retirer mon e-mail',
    back: 'Retour à Together',
  },
};

type LeavePageProps = {
  query: string;
  locale: Locale;
};

export function LeavePage({ query, locale }: LeavePageProps) {
  const t = copy[locale];
  const search = new URLSearchParams(query);
  const email = search.get('email') || '';
  const token = search.get('token') || '';
  const removed = search.get('status') === 'removed';
  const canRemove = !removed && validateRemovalToken(email, token);
  const state = removed ? 'removed' : canRemove ? 'leave' : 'inactive';

  return (
    <>
      <title>
        {`${removed ? t.removedTitle : t.leaveTitle} — Together`}
      </title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <main className="message-page" lang={locale}>
        <section className="message-card">
          <p className="eyebrow">{t[`${state}Eyebrow`]}</p>
          <h1>{t[`${state}Heading`]}</h1>
          <p>{t[`${state}Body`]}</p>
          {canRemove ? (
            <form action="/api/leave-interest" method="post">
              <input name="email" type="hidden" value={email} />
              <input name="token" type="hidden" value={token} />
              <button className="primary" type="submit">
                {t.remove}
              </button>
            </form>
          ) : (
            <a className="primary" href={localePath(locale, '/')}>
              {t.back}
            </a>
          )}
        </section>
      </main>
    </>
  );
}
