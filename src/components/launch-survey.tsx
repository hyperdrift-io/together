'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { trackTogetherEvent } from '../lib/analytics-client';
import {
  adultEligibilityOptions,
  londonAreaOptions,
  placeTypeOptions,
} from '../lib/launch-qualification-schema';
import type { LaunchQualificationInput } from '../lib/launch-qualification-schema';

type SurveyState = 'answering' | 'saving' | 'saved' | 'check-email' | 'error';

const questions = [
  {
    key: 'placeType',
    prompt: 'Where would you most naturally use Together?',
    options: placeTypeOptions,
  },
  {
    key: 'londonArea',
    prompt: 'Where in London do you spend most of your social time?',
    options: londonAreaOptions,
  },
  {
    key: 'adultEligibility',
    prompt: 'Are you 18 or over?',
    options: adultEligibilityOptions,
  },
] as const;

const storageKey = 'together-launch-survey-completed';
const visitorKey = 'together-launch-survey-visitor';

function visitorId() {
  const existing = window.localStorage.getItem(visitorKey);

  if (existing) {
    return existing;
  }

  const next = window.crypto.randomUUID().replaceAll('-', '');
  window.localStorage.setItem(visitorKey, next);
  return next;
}

export function LaunchSurvey() {
  const [answers, setAnswers] = useState<Partial<LaunchQualificationInput>>({});
  const [email, setEmail] = useState('');
  const [surveyState, setSurveyState] = useState<SurveyState>('answering');
  const [errorMessage, setErrorMessage] = useState('');
  const started = useRef(false);

  useEffect(() => {
    trackTogetherEvent('launch_survey_viewed');
  }, []);

  const setAnswer = (
    key: keyof LaunchQualificationInput,
    value: string,
  ) => {
    if (!started.current) {
      started.current = true;
      trackTogetherEvent('launch_survey_started');
    }

    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const submitSurvey = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !answers.placeType ||
      !answers.londonArea ||
      !answers.adultEligibility
    ) {
      setErrorMessage('Choose one answer for each question.');
      return;
    }

    setSurveyState('saving');
    setErrorMessage('');

    try {
      const response = await fetch('/api/launch-survey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: visitorId(),
          email,
          ...answers,
        }),
      });
      const payload = (await response.json()) as {
        status?: 'saved' | 'check-email' | 'already-confirmed';
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || 'We could not save your answers.');
      }

      window.localStorage.setItem(storageKey, 'true');
      trackTogetherEvent('launch_survey_completed', {
        joined_launch_list: Boolean(email),
      });
      setSurveyState(
        payload.status === 'check-email' ? 'check-email' : 'saved',
      );
    } catch (error) {
      setSurveyState('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not save your answers. Please try again.',
      );
    }
  };

  if (surveyState === 'check-email') {
    return (
      <div className="public-survey-complete" aria-live="polite">
        <p className="eyebrow">You shaped the first room</p>
        <h3>Check your inbox to join the list.</h3>
        <p>Your answers will be linked once you confirm your email.</p>
      </div>
    );
  }

  if (surveyState === 'saved') {
    return (
      <div className="public-survey-complete" aria-live="polite">
        <p className="eyebrow">Thank you</p>
        <h3>You helped choose where Together begins.</h3>
        <p>You can return anytime to join the first list.</p>
      </div>
    );
  }

  return (
    <form className="public-survey-form" onSubmit={submitSurvey}>
      {questions.map((question) => (
        <fieldset key={question.key} disabled={surveyState === 'saving'}>
          <legend>{question.prompt}</legend>
          <div className="public-survey-options">
            {question.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={question.key}
                  value={option.value}
                  checked={answers[question.key] === option.value}
                  onChange={() => setAnswer(question.key, option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="public-survey-email">
        <label htmlFor="survey-email">
          Want the first invitation too? Add your email.
        </label>
        <input
          id="survey-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address (optional)"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={surveyState === 'saving'}
        />
        <p>
          With an email, we’ll send a confirmation link and keep these answers
          with your launch-list registration. Without one, they stay anonymous.
        </p>
      </div>

      {surveyState === 'error' ? (
        <p className="public-survey-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button className="primary" type="submit" disabled={surveyState === 'saving'}>
        {surveyState === 'saving' ? 'Saving…' : 'Share my answers'}
      </button>
    </form>
  );
}
