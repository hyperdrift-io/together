'use client';

import { useEffect, useRef, useState } from 'react';

import { trackTogetherEvent } from '../lib/analytics-client';
import {
  adultEligibilityOptions,
  londonAreaOptions,
  placeTypeOptions,
} from '../lib/launch-qualification-schema';
import type {
  AdultEligibility,
  LaunchQualificationInput,
  LondonArea,
  PlaceType,
} from '../lib/launch-qualification-schema';

type Question = {
  eyebrow: string;
  prompt: string;
  key: keyof LaunchQualificationInput;
  options: ReadonlyArray<{ value: string; label: string }>;
};

type SubmissionState = 'answering' | 'submitting' | 'completed' | 'error';

const questions: readonly Question[] = [
  {
    eyebrow: 'Help choose where Together begins.',
    prompt: 'Where would you most naturally use Together?',
    key: 'placeType',
    options: placeTypeOptions,
  },
  {
    eyebrow: 'Help us find the first shared places.',
    prompt: 'Where in London do you spend most of your social time?',
    key: 'londonArea',
    options: londonAreaOptions,
  },
  {
    eyebrow: 'One final detail.',
    prompt: 'Are you 18 or over?',
    key: 'adultEligibility',
    options: adultEligibilityOptions,
  },
] as const;

const emptyAnswers: Partial<LaunchQualificationInput> = {};

function completeAnswers(
  answers: Partial<LaunchQualificationInput>,
): answers is LaunchQualificationInput {
  return Boolean(
    answers.placeType &&
      answers.londonArea &&
      answers.adultEligibility,
  );
}

export function LaunchQualification({
  email,
  token,
  initiallyCompleted,
}: {
  email: string;
  token: string;
  initiallyCompleted: boolean;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] =
    useState<Partial<LaunchQualificationInput>>(emptyAnswers);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>(
      initiallyCompleted ? 'completed' : 'answering',
    );
  const [errorMessage, setErrorMessage] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (!initiallyCompleted) {
      trackTogetherEvent('launch_qualification_viewed');
    }
  }, [initiallyCompleted]);

  const submitQualification = async (
    completedAnswers: LaunchQualificationInput,
  ) => {
    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/launch-qualification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          ...completedAnswers,
        }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          payload.message ||
            'Your answers did not save. Please try again.',
        );
      }

      trackTogetherEvent('launch_qualification_step_completed', {
        question_number: questions.length,
      });
      trackTogetherEvent('launch_qualification_completed');
      setSubmissionState('completed');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Your answers did not save. Please try again.',
      );
      setSubmissionState('error');
    }
  };

  const chooseAnswer = (
    key: keyof LaunchQualificationInput,
    value: string,
  ) => {
    if (!started.current) {
      started.current = true;
      trackTogetherEvent('launch_qualification_started');
    }

    const nextAnswers = {
      ...answers,
      [key]: value,
    } as Partial<LaunchQualificationInput>;

    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      trackTogetherEvent('launch_qualification_step_completed', {
        question_number: step + 1,
      });
      setStep((currentStep) => currentStep + 1);
      return;
    }

    if (completeAnswers(nextAnswers)) {
      void submitQualification(nextAnswers);
    }
  };

  if (submissionState === 'completed') {
    return (
      <section className="qualification-complete" aria-live="polite">
        <p className="eyebrow">Your signal is in</p>
        <h2>You helped choose where Together begins.</h2>
        <p>
          We’ll use your answers to shape the first London pilot.
        </p>
        <a className="primary" href="/">
          Back to Together
        </a>
      </section>
    );
  }

  const question = questions[step];

  if (!question) {
    return null;
  }

  return (
    <section className="qualification-survey" aria-live="polite">
      <header>
        <p>
          {step + 1} of {questions.length}
        </p>
        <ol
          className="qualification-progress"
          aria-label={`Question ${step + 1} of ${questions.length}`}
        >
          {questions.map((item, index) => (
            <li
              key={item.key}
              data-state={
                index < step
                  ? 'completed'
                  : index === step
                    ? 'current'
                    : 'upcoming'
              }
            >
              <span className="visually-hidden">
                {index < step
                  ? 'Completed'
                  : index === step
                    ? 'Current'
                    : 'Upcoming'}
              </span>
            </li>
          ))}
        </ol>
      </header>

      <form
        onSubmit={(event) => event.preventDefault()}
        aria-busy={submissionState === 'submitting'}
      >
        <p className="eyebrow">{question.eyebrow}</p>
        <fieldset disabled={submissionState === 'submitting'}>
          <legend>{question.prompt}</legend>
          <div className="qualification-options">
            {question.options.map((option) => (
              <button
                key={option.value}
                className="answer"
                type="button"
                onClick={() =>
                  chooseAnswer(question.key, option.value)
                }
              >
                <span aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        {submissionState === 'error' ? (
          <div className="qualification-error" role="alert">
            <p>{errorMessage}</p>
            <button
              className="retry"
              type="button"
              onClick={() => {
                if (completeAnswers(answers)) {
                  void submitQualification(answers);
                }
              }}
            >
              Try again
            </button>
          </div>
        ) : null}

        <footer>
          {step > 0 && submissionState !== 'submitting' ? (
            <button
              className="quiet"
              type="button"
              onClick={() => setStep((currentStep) => currentStep - 1)}
            >
              Back
            </button>
          ) : (
            <span />
          )}
          <div>
            <p>60 seconds · Optional</p>
            <a href="/">Maybe later</a>
          </div>
        </footer>
      </form>
    </section>
  );
}
