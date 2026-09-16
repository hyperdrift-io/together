'use client';

import { useState } from 'react';

import type { Locale } from '../lib/locale';

const copy = {
  en: {
    url: 'https://together.hyperdrift.io/',
    address: 'together.hyperdrift.io',
    copied: 'Link copied to your clipboard.',
    unavailable: 'Copy is unavailable here. Use the address above.',
    eyebrow: 'Pass it on',
    title: 'Know someone who should be here?',
    body: 'Send Together to someone who would bring a real hello into the room.',
    copy: 'Copy link',
  },
  fr: {
    url: 'https://together.hyperdrift.io/fr',
    address: 'together.hyperdrift.io/fr',
    copied: 'Lien copié.',
    unavailable: 'Copie impossible ici. Utilise l’adresse ci-dessus.',
    eyebrow: 'Fais passer',
    title: 'Tu connais quelqu’un qui devrait être là ?',
    body: 'Envoie Together à quelqu’un qui oserait un vrai bonjour.',
    copy: 'Copier le lien',
  },
};

export function ShareTogether({ locale }: { locale: Locale }) {
  const [message, setMessage] = useState('');
  const t = copy[locale];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(t.url);
      setMessage(t.copied);
    } catch {
      setMessage(t.unavailable);
    }
  };

  return (
    <section className="share-together" aria-labelledby="share-together-title">
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="share-together-title">{t.title}</h2>
        <p>{t.body}</p>
        <p className="share-address">
          <a href={t.url}>{t.address}</a>
        </p>
        <button className="copy-link" type="button" onClick={copyLink}>
          {t.copy}
        </button>
        <p className="share-status" role="status" aria-live="polite">
          {message}
        </p>
      </div>

      {locale === 'en' ? (
        <figure>
          <img
            src="/images/together-share-qr.svg"
            alt="QR code linking to Together’s homepage"
            width="128"
            height="128"
          />
          <figcaption>Scan to open Together.</figcaption>
        </figure>
      ) : null}
    </section>
  );
}
