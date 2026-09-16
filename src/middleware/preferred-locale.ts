import type { Context, MiddlewareHandler } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

import { type Locale, parseLocale } from '../lib/locale';
import { localeCookie, preferredLocale } from '../lib/preferred-locale';

const oneYear = 60 * 60 * 24 * 365;

// `/` differs by browser language and saved choice, so caches must too.
function varyByLocale(context: Context) {
  context.header('Vary', 'Accept-Language, Cookie', { append: true });
}

function rememberChoice(context: Context, locale: Locale) {
  setCookie(context, localeCookie, locale, {
    path: '/',
    maxAge: oneYear,
    sameSite: 'Lax',
    secure: new URL(context.req.url).protocol === 'https:',
  });
}

// `/` sends French browsers to `/fr` until the visitor picks a language with
// the header switch (`?lang=`), which is remembered in a cookie.
export default (): MiddlewareHandler => async (context, next) => {
  if (context.req.method !== 'GET') {
    return next();
  }

  const query = context.req.query('lang');
  const chosen = query ? parseLocale(query) : undefined;
  const locale = preferredLocale(
    chosen ?? getCookie(context, localeCookie),
    context.req.header('accept-language') || '',
  );

  if (context.req.path === '/' && locale === 'fr') {
    const target = new URL(context.req.url);
    target.searchParams.delete('lang');
    if (chosen) {
      rememberChoice(context, chosen);
    }
    varyByLocale(context);
    return context.redirect(`/fr${target.search}`, 302);
  }

  await next();

  // Waku replaces the response, so headers are set once it exists.
  if (chosen) {
    rememberChoice(context, chosen);
  }
  if (context.req.path === '/') {
    varyByLocale(context);
  }
};
