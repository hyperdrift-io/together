'use client';

import { useState } from 'react';

const shareUrl = 'https://together.hyperdrift.io/';

export function ShareTogether() {
  const [message, setMessage] = useState('');

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setMessage('Link copied to your clipboard.');
    } catch {
      setMessage('Copy is unavailable here. Use the address above.');
    }
  };

  return (
    <section className="share-together" aria-labelledby="share-together-title">
      <div>
        <p className="eyebrow">Pass it on</p>
        <h2 id="share-together-title">Know someone who should be here?</h2>
        <p>
          Send Together to someone who would bring a real hello into the room.
        </p>
        <p className="share-address">
          <a href={shareUrl}>together.hyperdrift.io</a>
        </p>
        <button className="copy-link" type="button" onClick={copyLink}>
          Copy link
        </button>
        <p className="share-status" role="status" aria-live="polite">
          {message}
        </p>
      </div>

      <figure>
        <img
          src="/images/together-share-qr.svg"
          alt="QR code linking to Together’s homepage"
          width="128"
          height="128"
        />
        <figcaption>Scan to open Together.</figcaption>
      </figure>
    </section>
  );
}
