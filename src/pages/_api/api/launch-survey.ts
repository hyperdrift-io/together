import { registerInterest } from '../../../lib/register-interest';
import {
  saveLaunchSurveyResponse,
  validLaunchEmail,
} from '../../../lib/launch-registration';
import { isLaunchQualificationInput } from '../../../lib/launch-qualification-schema';

function validVisitorId(value: unknown) {
  return (
    typeof value === 'string' &&
    /^[a-zA-Z0-9_-]{16,200}$/.test(value)
  );
}

export const GET = async (): Promise<Response> =>
  Response.json(
    { message: 'Submit the survey instead.' },
    {
      status: 405,
      headers: { Allow: 'POST' },
    },
  );

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
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const visitorId = typeof body.visitorId === 'string' ? body.visitorId : '';

  if (!validVisitorId(visitorId) || !isLaunchQualificationInput(body)) {
    return Response.json(
      { message: 'Choose an answer for each question.' },
      { status: 400 },
    );
  }

  if (email && !validLaunchEmail(email)) {
    return Response.json(
      { message: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  try {
    const registration = email ? await registerInterest(email) : null;
    saveLaunchSurveyResponse(visitorId, body, email);

    return Response.json(
      {
        status: registration?.status ?? 'saved',
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error &&
      ['Enter a valid email address.', 'Use an email address with a valid domain.'].includes(
        error.message,
      )
        ? error.message
        : 'We could not save your answers. Please try again.';

    return Response.json(
      { message },
      {
        status: message === 'We could not save your answers. Please try again.'
          ? 503
          : 400,
      },
    );
  }
};
