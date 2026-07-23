'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

type SubmissionState = 'idle' | 'complete';

const track = (event: string, properties: Record<string, unknown> = {}) => {
  window.dataLayer?.push({
    event,
    city: 'london',
    variant: 'outcome_first',
    ...properties,
  });
};

export function MeetingRequest() {
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
    track('meeting_request_started');
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    track('meeting_request_submitted', {
      availability: formData.get('availability'),
      london_area: formData.get('london-area'),
      meeting_format: formData.get('meeting-format'),
      travel_range: formData.get('travel-range'),
    });
    setSubmissionState('complete');
  };

  if (submissionState === 'complete') {
    return (
      <section className="request-confirmation" aria-live="polite">
        <p className="section-label">Request ready</p>
        <h2>Next stop: face to face.</h2>
        <p>
          This prototype shows the complete appetite flow. Your details were
          not sent or saved.
        </p>
        <button
          className="secondary"
          type="button"
          onClick={() => setSubmissionState('idle')}
        >
          Review the form again
        </button>
      </section>
    );
  }

  return (
    <form
      id="request"
      className="meeting-request"
      onFocusCapture={recordStart}
      onSubmit={submitRequest}
    >
      <header>
        <p className="section-label">London pilot</p>
        <h2>Put a meeting in the calendar.</h2>
        <p>
          Start with the practical stuff. No public profile. No inbox to
          maintain.
        </p>
      </header>

      <fieldset>
        <legend>
          <span>01</span>
          When can you meet?
        </legend>
        <label>
          Availability
          <select name="availability" defaultValue="" required>
            <option value="" disabled>
              Choose a window
            </option>
            <option value="this-week">This week</option>
            <option value="this-weekend">This weekend</option>
            <option value="next-week">Next week</option>
            <option value="specific-time">I have a specific time</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>
          <span>02</span>
          Make it workable.
        </legend>
        <div className="field-grid">
          <label>
            London area
            <select name="london-area" defaultValue="" required>
              <option value="" disabled>
                Choose an area
              </option>
              <option value="central">Central</option>
              <option value="north">North</option>
              <option value="east">East</option>
              <option value="south">South</option>
              <option value="west">West</option>
              <option value="flexible">Flexible across London</option>
            </select>
          </label>

          <label>
            First meeting
            <select name="meeting-format" defaultValue="" required>
              <option value="" disabled>
                Choose a format
              </option>
              <option value="coffee">Coffee</option>
              <option value="drink">A drink</option>
              <option value="walk">A walk</option>
              <option value="activity">An activity</option>
              <option value="no-preference">No preference</option>
            </select>
          </label>
        </div>

        <label>
          Travel range
          <select name="travel-range" defaultValue="" required>
            <option value="" disabled>
              Choose a range
            </option>
            <option value="local">Keep it local</option>
            <option value="30-minutes">Up to 30 minutes</option>
            <option value="60-minutes">Up to 60 minutes</option>
            <option value="anywhere-london">Anywhere in London</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>
          <span>03</span>
          Make it worth meeting.
        </legend>
        <label>
          What matters when choosing someone for you to meet?
          <textarea
            name="meeting-priority"
            rows={3}
            maxLength={240}
            placeholder="A few words is enough."
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>
          <span>04</span>
          Where should we reach you?
        </legend>
        <div className="field-grid">
          <label>
            First name
            <input
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
            />
          </label>

          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
        </div>

        <label className="consent">
          <input name="adult-consent" type="checkbox" required />
          <span>I confirm I am 18 or over and joining the London pilot.</span>
        </label>
      </fieldset>

      <footer>
        <button className="primary" type="submit">
          Get me a meeting
        </button>
        <p>
          Prototype preview. Submitting demonstrates the flow; nothing is sent
          or stored.
        </p>
      </footer>
    </form>
  );
}
