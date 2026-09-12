'use client';

import { useEffect, useRef, useState } from 'react';

import { LaunchSurvey } from './launch-survey';

// Any plain `<a href="#survey">` opens the survey, and the address bar stays
// shareable: together.hyperdrift.io/#survey lands straight in the questions.
const surveyHash = '#survey';

export function LaunchSurveyDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === surveyHash && !dialog.current?.open) {
        dialog.current?.showModal();
        setOpen(true);
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const closed = () => {
    setOpen(false);

    if (window.location.hash === surveyHash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <dialog
      id="survey"
      ref={dialog}
      aria-labelledby="survey-title"
      onClose={closed}
    >
      <header>
        <div>
          <p className="eyebrow">Help shape the first room</p>
          <h2 id="survey-title">Where should Together begin?</h2>
          <p>
            Three optional answers help us find the first public places where
            a real hello could happen.
          </p>
        </div>
        <button type="button" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </header>
      {open ? <LaunchSurvey /> : null}
    </dialog>
  );
}
