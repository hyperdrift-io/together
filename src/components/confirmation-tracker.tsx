'use client';

import { useEffect } from 'react';

import { trackTogetherEvent } from '../lib/analytics-client';

export function ConfirmationTracker() {
  useEffect(() => {
    trackTogetherEvent('launch_interest_confirmed');
  }, []);

  return null;
}
