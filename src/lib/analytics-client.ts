import type { Locale } from './locale';

type PostHogLike = { capture: (event: string, properties?: Record<string, unknown>) => void };

const defaultProperties = {
  market: 'en',
  city: 'london',
  variant: 'mutual_hello',
};

// FR has no launch city yet, so its events carry the market alone.
export function marketProperties(market: Locale) {
  return market === 'fr' ? { market, city: null } : { market };
}

/** PostHog capture when the snippet is loaded; a silent no-op otherwise. Analytics never breaks the page. */
export function trackTogetherEvent(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    (window as Window & { posthog?: PostHogLike }).posthog?.capture(event, {
      ...defaultProperties,
      ...properties,
    });
  } catch {
    // ignore
  }
}
