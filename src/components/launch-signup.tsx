'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

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

const variant = 'mutual_hello';

const track = (event: string) => {
  if (window.gtag) {
    window.gtag('event', event, {
      city: 'london',
      variant,
    });
    return;
  }

  window.dataLayer?.push({
    event,
    city: 'london',
    variant,
  });
};

export function LaunchSignup() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const started = useRef(false);

  useEffect(() => {
    track('landing_viewed');
  }, []);

  const recordStart = () => {
    if (started.current) {
      return;
    }

    started.current = true;
    track('launch_interest_started');
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
        throw new Error(
          payload.message ||
            'We could not send the confirmation email. Please try again.',
        );
      }

      track('launch_interest_submitted');
      setSubmissionState(
        payload.status === 'already-confirmed'
          ? 'already-confirmed'
          : 'check-email',
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not send the confirmation email. Please try again.',
      );
      setSubmissionState('error');
    }
  };

  if (submissionState === 'check-email') {
    return (
      <section className="signup-confirmation" aria-live="polite">
        <p className="eyebrow">One more step</p>
        <h2>Check your inbox.</h2>
        <p>
          Open the email from Together and confirm your place on the first
          list.
        </p>
      </section>
    );
  }

  if (submissionState === 'already-confirmed') {
    return (
      <section className="signup-confirmation" aria-live="polite">
        <p className="eyebrow">You’re in</p>
        <h2>You’re already on the list.</h2>
        <p>We’ll write when Together is ready for its first real hello.</p>
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
      <label htmlFor="launch-email">Be first to try Together</label>
      <div>
        <input
          id="launch-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
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
          {submissionState === 'submitting' ? 'Joining…' : 'Join Together'}
        </button>
      </div>

      {submissionState === 'error' ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <small>
        18+ · London will be the first launch community. Confirm by email. You
        can leave at any time. <a href="/privacy">How we use your email.</a>
      </small>
    </form>
  );
}
