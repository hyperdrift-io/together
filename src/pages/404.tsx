import { Link } from 'waku';
import { unstable_getRequest } from 'waku/router/server';

import type { Locale } from '../lib/locale';

const copy: Record<Locale, { title: string; body: string; back: string }> = {
  en: {
    title: 'Not here.',
    body: 'This page does not exist, or it moved. The sign is still lit at home.',
    back: 'Back home',
  },
  fr: {
    title: 'Pas ici.',
    body: "Cette page n'existe pas, ou elle a changé d'adresse. La lumière est toujours allumée à l'accueil.",
    back: "Retour à l'accueil",
  },
};

export default function NotFoundPage() {
  const pathname = new URL(unstable_getRequest().url).pathname;
  const locale: Locale = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
  const t = copy[locale];
  return (
    <section className="hero">
      <title>{`${t.title} — Together`}</title>
      <meta name="robots" content="noindex,follow" />
      <div className="hero-copy">
        <h1>{t.title}</h1>
        <p>{t.body}</p>
        <p>
          <Link to={locale === 'fr' ? '/fr' : '/'}>{t.back}</Link>
        </p>
      </div>
    </section>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
