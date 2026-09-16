import {
  registrationMarket,
  removeLaunchRegistration,
} from '../../../lib/launch-registration';
import { localePath } from '../../../lib/locale';

export const POST = async (request: Request): Promise<Response> => {
  let email = '';
  let token = '';

  try {
    const formData = await request.formData();
    email = String(formData.get('email') || '');
    token = String(formData.get('token') || '');
  } catch {
    return Response.redirect(new URL('/leave?status=invalid', request.url), 303);
  }

  const leavePath = localePath(registrationMarket(email), '/leave');
  const removed = removeLaunchRegistration(email, token);
  return Response.redirect(
    new URL(`${leavePath}?status=${removed ? 'removed' : 'invalid'}`, request.url),
    303,
  );
};
