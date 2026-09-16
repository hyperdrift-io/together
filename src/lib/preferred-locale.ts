import { type Locale, parseLocale } from './locale';

export const localeCookie = 'together_locale';

// The visitor's top-ranked browser language, as a supported locale.
export function browserLocale(acceptLanguage: string): Locale {
  const [top] = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [tag = '', ...params] = part.trim().split(';');
      const q = params.find((param) => param.trim().startsWith('q='));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return { tag: tag.toLowerCase(), weight, index };
    })
    .filter(({ tag, weight }) => tag && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  return parseLocale(top?.tag.split('-')[0]);
}

// An explicit choice (the header switch) beats the browser language.
export function preferredLocale(
  savedChoice: string | undefined,
  acceptLanguage: string,
): Locale {
  return savedChoice === 'en' || savedChoice === 'fr'
    ? savedChoice
    : browserLocale(acceptLanguage);
}
