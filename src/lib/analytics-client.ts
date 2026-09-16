import type { Locale } from './locale';

const defaultProperties = {
  market: 'en',
  city: 'london',
  variant: 'mutual_hello',
};

// FR has no launch city yet, so its events carry the market alone.
export function marketProperties(market: Locale) {
  return market === 'fr' ? { market, city: null } : { market };
}

export function trackTogetherEvent(
  event: string,
  properties: Record<string, unknown> = {},
) {
  const eventProperties = {
    ...defaultProperties,
    ...properties,
  };

  if (window.gtag) {
    window.gtag('event', event, eventProperties);
    return;
  }

  window.dataLayer?.push({
    event,
    ...eventProperties,
  });
}
