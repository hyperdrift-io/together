'use client';

import { useState, type FormEvent } from 'react';

type SubmissionState = 'closed' | 'editing' | 'submitting' | 'saved' | 'error';

export function LaunchPhonePreference({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('closed');
  const [errorMessage, setErrorMessage] = useState('');

  const savePreference = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('submitting');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get('phone') || '');
    const smsOptIn = formData.get('sms-opt-in') === 'on';

    if (!smsOptIn) {
      setErrorMessage('Choose the text consent box to save this preference.');
      setSubmissionState('error');
      return;
    }

    try {
      const response = await fetch('/api/launch-phone-preference', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, phone, smsOptIn }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || 'Your text preference did not save.');
      }

      setSubmissionState('saved');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Your text preference did not save.',
      );
      setSubmissionState('error');
    }
  };

  if (submissionState === 'saved') {
    return (
      <section className="phone-preference" aria-live="polite">
        <p className="eyebrow">Text updates on</p>
        <p>Your number is private. We&apos;ll text only about Together events and invitations.</p>
      </section>
    );
  }

  return (
    <section className="phone-preference" aria-labelledby="phone-preference-title">
      <p className="eyebrow">Optional</p>
      <h2 id="phone-preference-title">Be ready when a plan comes together.</h2>
      <p>
        A text can help when an invitation needs a quick reply. Your number is
        never shown to other members.
      </p>

      {submissionState === 'closed' ? (
        <button
          className="quiet"
          type="button"
          onClick={() => setSubmissionState('editing')}
        >
          Add a mobile number
        </button>
      ) : (
        <form onSubmit={savePreference} aria-busy={submissionState === 'submitting'}>
          <label htmlFor="launch-phone">Mobile number</label>
          <input
            id="launch-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+44 7700 900123"
            required
            disabled={submissionState === 'submitting'}
          />
          <label className="text-consent" htmlFor="sms-opt-in">
            <input
              id="sms-opt-in"
              name="sms-opt-in"
              type="checkbox"
              disabled={submissionState === 'submitting'}
            />
            <span>Send me occasional Together event invitations and updates by text. Stop anytime.</span>
          </label>
          {submissionState === 'error' ? (
            <p className="form-error" role="alert">{errorMessage}</p>
          ) : null}
          <div>
            <button className="primary" type="submit" disabled={submissionState === 'submitting'}>
              {submissionState === 'submitting' ? 'Saving…' : 'Save text preference'}
            </button>
            <button
              className="quiet"
              type="button"
              disabled={submissionState === 'submitting'}
              onClick={() => {
                setErrorMessage('');
                setSubmissionState('closed');
              }}
            >
              Not now
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
