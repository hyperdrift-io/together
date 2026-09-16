'use client';

import { useEffect } from 'react';

import { marketProperties, trackTogetherEvent } from '../lib/analytics-client';
import type { Locale } from '../lib/locale';

export function ConfirmationTracker({ market }: { market: Locale }) {
  useEffect(() => {
    trackTogetherEvent('launch_interest_confirmed', marketProperties(market));
  }, [market]);

  return null;
}
