'use client';

import type { ReactNode } from 'react';

import { trackTogetherEvent } from '../lib/analytics-client';
import { pilotAppUrl } from '../lib/pilot-app';

type PilotLinkProps = {
  children: ReactNode;
  className?: string;
  placement: 'header' | 'pilot-section';
};

// Every route into the pilot is measured so the landing page can tell
// returning testers from new registrations.
export function PilotLink({ children, className, placement }: PilotLinkProps) {
  return (
    <a
      className={className}
      href={pilotAppUrl}
      onClick={() => trackTogetherEvent('pilot_signin_clicked', { placement })}
    >
      {children}
    </a>
  );
}
