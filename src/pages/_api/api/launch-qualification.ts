import {
  isLaunchQualificationInput,
} from '../../../lib/launch-qualification-schema';
import {
  saveLaunchQualification,
} from '../../../lib/launch-registration';

export const POST = async (request: Request): Promise<Response> => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { message: 'Choose an answer for each question.' },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== 'object') {
    return Response.json(
      { message: 'Choose an answer for each question.' },
      { status: 400 },
    );
  }

  const body = payload as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email : '';
  const token = typeof body.token === 'string' ? body.token : '';

  if (!isLaunchQualificationInput(body)) {
    return Response.json(
      { message: 'Choose an answer for each question.' },
      { status: 400 },
    );
  }

  if (!saveLaunchQualification(email, token, body)) {
    return Response.json(
      {
        message:
          'This qualification link is not active. Return to your confirmation email to continue.',
      },
      { status: 403 },
    );
  }

  return Response.json({ status: 'completed' }, { status: 200 });
};
