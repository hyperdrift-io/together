import { type Locale, localePath, parseLocale } from './locale';
import { registerInterest } from './register-interest';

const validationMessages: Record<string, string> = {
  'Enter a valid email address.': 'Saisis une adresse e-mail valide.',
  'Use an email address with a valid domain.':
    'Utilise une adresse e-mail avec un domaine valide.',
  'Enter a valid mobile number, including the country code.':
    'Saisis un numéro de mobile valide, avec l’indicatif du pays.',
  'Choose the text consent box to receive invitation updates.':
    'Coche la case d’accord pour recevoir les invitations par SMS.',
};
const sendFailure = 'We could not send the confirmation email. Please try again.';
const sendFailureFr =
  'Impossible d’envoyer l’e-mail de confirmation. Réessaie dans un instant.';

function localizedMessage(message: string, market: Locale) {
  if (market === 'en') {
    return message;
  }

  return validationMessages[message] ?? sendFailureFr;
}

function acceptsJson(request: Request) {
  return request.headers.get('accept')?.includes('application/json') ?? false;
}

function failure(
  request: Request,
  message: string,
  status: number,
  market: Locale,
) {
  if (acceptsJson(request)) {
    return Response.json(
      { message: localizedMessage(message, market) },
      { status },
    );
  }

  const target = new URL(localePath(market, '/'), request.url);
  target.searchParams.set('registration', 'failed');
  target.hash = 'join';
  return Response.redirect(target, 303);
}

export async function handleLaunchInterestRequest(request: Request) {
  let email = '';
  let company = '';
  let phone = '';
  let smsOptIn = false;
  let market: Locale = 'en';

  try {
    const formData = await request.formData();
    email = String(formData.get('email') || '');
    company = String(formData.get('company') || '');
    phone = String(formData.get('phone') || '');
    smsOptIn = formData.get('smsOptIn') === 'on';
    market = parseLocale(formData.get('market'));
  } catch {
    return failure(request, 'Enter a valid email address.', 400, market);
  }

  const checkEmailPath = localePath(market, '/check-email');

  if (company) {
    return acceptsJson(request)
      ? Response.json({ status: 'check-email' }, { status: 202 })
      : Response.redirect(new URL(checkEmailPath, request.url), 303);
  }

  try {
    const result = await registerInterest(email, { phone, smsOptIn, market });

    if (acceptsJson(request)) {
      return Response.json(result, { status: 202 });
    }

    const pathname =
      result.status === 'already-confirmed'
        ? `${checkEmailPath}?status=confirmed`
        : checkEmailPath;
    return Response.redirect(new URL(pathname, request.url), 303);
  } catch (error) {
    const isValidation =
      error instanceof Error && error.message in validationMessages;
    const message = isValidation ? error.message : sendFailure;
    const status = isValidation ? 400 : 503;
    console.error(
      'Together registration failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return failure(request, message, status, market);
  }
}
