'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

type SubmissionState = 'idle' | 'complete';

const variant = 'aida_arranged_date';

const track = (event: string) => {
  window.dataLayer?.push({
    event,
    city: 'london',
    variant,
  });
};

export function LaunchSignup() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
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

  const submitInterest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track('launch_interest_submitted');
    setSubmissionState('complete');
  };

  if (submissionState === 'complete') {
    return (
      <section className="signup-confirmation" aria-live="polite">
        <p className="eyebrow">Interest registered</p>
        <h2>You want Together in London.</h2>
        <p>
          If enough Londoners agree, we will build it. Founding members will be
          first to try the app.
        </p>
        <small>
          Prototype preview: your email was not sent or stored in this local
          version.
        </small>
      </section>
    );
  }

  return (
    <form
      id="join"
      className="launch-signup"
      onFocusCapture={recordStart}
      onSubmit={submitInterest}
    >
      <header>
        <h2>Want this in London?</h2>
        <p>Register your interest and help make Together happen.</p>
      </header>

      <div>
        <label htmlFor="launch-email">Email address</label>
        <input
          id="launch-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          required
        />
        <button className="primary" type="submit">
          I want Together
        </button>
      </div>

      <small>
        London launch · 18+ · Founding members get first access. By joining,
        you agree to receive Together launch updates.
      </small>
    </form>
  );
}
