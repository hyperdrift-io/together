// Each locale is also a launch market: registrations, counters, and analytics
// are kept apart by this value.
export const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export function parseLocale(value: unknown): Locale {
  return value === 'fr' ? 'fr' : 'en';
}

export function localePath(locale: Locale, path: string) {
  if (locale === 'en') {
    return path;
  }

  return path === '/' ? '/fr' : `/fr${path}`;
}
