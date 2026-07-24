import { registerInterest } from './register-interest';

function acceptsJson(request: Request) {
  return request.headers.get('accept')?.includes('application/json') ?? false;
}

function failure(request: Request, message: string, status: number) {
  if (acceptsJson(request)) {
    return Response.json({ message }, { status });
  }

  const target = new URL('/', request.url);
  target.searchParams.set('registration', 'failed');
  target.hash = 'join';
  return Response.redirect(target, 303);
}

export async function handleLaunchInterestRequest(request: Request) {
  let email = '';
  let company = '';

  try {
    const formData = await request.formData();
    email = String(formData.get('email') || '');
    company = String(formData.get('company') || '');
  } catch {
    return failure(request, 'Enter a valid email address.', 400);
  }

  if (company) {
    return acceptsJson(request)
      ? Response.json({ status: 'check-email' }, { status: 202 })
      : Response.redirect(new URL('/check-email', request.url), 303);
  }

  try {
    const result = await registerInterest(email);

    if (acceptsJson(request)) {
      return Response.json(result, { status: 202 });
    }

    const pathname =
      result.status === 'already-confirmed'
        ? '/check-email?status=confirmed'
        : '/check-email';
    return Response.redirect(new URL(pathname, request.url), 303);
  } catch (error) {
    const validationMessages = new Set([
      'Enter a valid email address.',
      'Use an email address with a valid domain.',
    ]);
    const message =
      error instanceof Error && validationMessages.has(error.message)
        ? error.message
        : 'We could not send the confirmation email. Please try again.';
    const status = validationMessages.has(message) ? 400 : 503;
    console.error(
      'Together registration failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return failure(request, message, status);
  }
}
