import { saveLaunchPhonePreference } from '../../../lib/launch-registration';

export const POST = async (request: Request): Promise<Response> => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: 'Enter a mobile number to save this preference.' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object') {
    return Response.json({ message: 'Enter a mobile number to save this preference.' }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email : '';
  const token = typeof body.token === 'string' ? body.token : '';
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const smsOptIn = body.smsOptIn === true;

  if (!smsOptIn) {
    return Response.json({ message: 'Choose the text consent box to save this preference.' }, { status: 400 });
  }

  const result = saveLaunchPhonePreference(email, token, phone);

  if (result === 'invalid-phone') {
    return Response.json({ message: 'Enter a valid mobile number, including the country code.' }, { status: 400 });
  }

  if (result === 'inactive-link') {
    return Response.json(
      { message: 'This confirmation link is not active. Return to your confirmation email to continue.' },
      { status: 403 },
    );
  }

  return Response.json({ status: 'saved' }, { status: 200 });
};
