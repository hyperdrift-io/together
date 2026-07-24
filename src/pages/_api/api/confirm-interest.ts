import { confirmLaunchRegistration } from '../../../lib/launch-registration';

export const POST = async (request: Request): Promise<Response> => {
  let email = '';
  let token = '';

  try {
    const formData = await request.formData();
    email = String(formData.get('email') || '');
    token = String(formData.get('token') || '');
  } catch {
    return Response.redirect(new URL('/confirm?status=invalid', request.url), 303);
  }

  const result = confirmLaunchRegistration(email, token);
  const target = new URL('/confirm', request.url);
  target.searchParams.set(
    'status',
    result === 'confirmed' || result === 'already-confirmed'
      ? 'confirmed'
      : 'invalid',
  );
  target.searchParams.set('email', email);
  target.searchParams.set('token', token);

  return Response.redirect(target, 303);
};
