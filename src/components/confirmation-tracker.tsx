'use client';

import { useEffect } from 'react';

export function ConfirmationTracker() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'launch_interest_confirmed', {
        city: 'london',
        variant: 'mutual_hello',
      });
      return;
    }

    window.dataLayer?.push({
      event: 'launch_interest_confirmed',
      city: 'london',
      variant: 'mutual_hello',
    });
  }, []);

  return null;
}
