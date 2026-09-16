'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { marketProperties, trackTogetherEvent } from '../lib/analytics-client';
import type { Locale } from '../lib/locale';

type SubmissionState =
  | 'idle'
  | 'submitting'
  | 'check-email'
  | 'already-confirmed'
  | 'error';

type RegistrationResponse = {
  status?: 'check-email' | 'already-confirmed';
  message?: string;
};

const copy = {
  en: {
    sendFailure: 'We could not send the confirmation email. Please try again.',
    checkEyebrow: 'One more step',
    checkTitle: 'Check your inbox.',
    checkBody:
      'Open the email from Together and confirm your place on the first list.',
    inEyebrow: 'You’re in',
    inTitle: 'You’re already on the list.',
    inBody: 'We’ll write when Together is ready for its first real hello.',
    label: 'Get your invitation',
    email: 'Email address',
    submitting: 'Sending…',
    submit: 'Get my invite',
    phone: 'Mobile number',
    phoneHint: 'Optional — for the first invitation by text',
    phonePlaceholder: '+44 7700 900123',
    consent:
      'Send me occasional Together invitations and updates by text. Stop anytime.',
    fineprint:
      '18+ · London will be the first launch community. Confirm by email. You can leave at any time.',
    privacy: 'How we use your email.',
  },
  fr: {
    sendFailure:
      'Impossible d’envoyer l’e-mail de confirmation. Réessaie dans un instant.',
    checkEyebrow: 'Plus qu’une étape',
    checkTitle: 'Regarde ta boîte mail.',
    checkBody:
      'Ouvre l’e-mail de Together et confirme ta place sur la première liste française.',
    inEyebrow: 'C’est fait',
    inTitle: 'Tu es déjà sur la liste.',
    inBody:
      'On t’écrit dès que Together est prêt pour un premier vrai bonjour en France.',
    label: 'Reçois ton invitation',
    email: 'Adresse e-mail',
    submitting: 'Envoi…',
    submit: 'Je veux mon invitation',
    phone: 'Mobile',
    phoneHint: 'Facultatif — pour recevoir la première invitation par SMS',
    phonePlaceholder: '+33 6 12 34 56 78',
    consent:
      'Envoyez-moi de temps en temps des invitations et nouvelles de Together par SMS. Désinscription à tout moment.',
    fineprint:
      '18+ · La liste France vient d’ouvrir. Confirmation par e-mail. Tu peux partir quand tu veux.',
    privacy: 'Comment on utilise ton e-mail (en anglais).',
  },
};

export function LaunchSignup({ market }: { market: Locale }) {
  const t = copy[market];
  const analytics = marketProperties(market);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const started = useRef(false);

  useEffect(() => {
    trackTogetherEvent('landing_viewed', marketProperties(market));
  }, [market]);

  const recordStart = () => {
    if (started.current) {
      return;
    }

    started.current = true;
    trackTogetherEvent('launch_interest_started', analytics);
  };

  const submitInterest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ),
      });
      const payload = (await response.json()) as RegistrationResponse;

      if (!response.ok) {
        throw new Error(payload.message || t.sendFailure);
      }

      trackTogetherEvent('launch_interest_submitted', analytics);
      setSubmissionState(
        payload.status === 'already-confirmed'
          ? 'already-confirmed'
          : 'check-email',
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t.sendFailure,
      );
      setSubmissionState('error');
    }
  };

  if (submissionState === 'check-email') {
    return (
      <section className="signup-confirmation" aria-live="polite">
        <p className="eyebrow">{t.checkEyebrow}</p>
        <h2>{t.checkTitle}</h2>
        <p>{t.checkBody}</p>
      </section>
    );
  }

  if (submissionState === 'already-confirmed') {
    return (
      <section className="signup-confirmation" aria-live="polite">
        <p className="eyebrow">{t.inEyebrow}</p>
        <h2>{t.inTitle}</h2>
        <p>{t.inBody}</p>
      </section>
    );
  }

  return (
    <form
      id="join"
      className="launch-signup"
      action="/api/launch-interest"
      method="post"
      onFocusCapture={recordStart}
      onSubmit={submitInterest}
    >
      <input name="market" type="hidden" value={market} />
      <label htmlFor="launch-email">{t.label}</label>
      <div className="signup-email-row">
        <input
          id="launch-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t.email}
          required
          disabled={submissionState === 'submitting'}
        />
        <input
          className="signup-trap"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button
          className="primary"
          type="submit"
          disabled={submissionState === 'submitting'}
        >
          {submissionState === 'submitting' ? t.submitting : t.submit}
        </button>
      </div>

      <div className="signup-phone-row">
        <label className="signup-phone-label" htmlFor="launch-phone">
          {t.phone} <span>{t.phoneHint}</span>
        </label>
        <input
          id="launch-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.phonePlaceholder}
          disabled={submissionState === 'submitting'}
        />
        <label className="text-consent" htmlFor="sms-opt-in">
          <input
            id="sms-opt-in"
            name="smsOptIn"
            type="checkbox"
            disabled={submissionState === 'submitting'}
          />
          <span>{t.consent}</span>
        </label>
      </div>

      {submissionState === 'error' ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <small>
        {t.fineprint} <a href="/privacy">{t.privacy}</a>
      </small>
    </form>
  );
}
