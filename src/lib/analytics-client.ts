const defaultProperties = {
  city: 'london',
  variant: 'mutual_hello',
};

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
