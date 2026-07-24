import { handleLaunchInterestRequest } from '../../../lib/launch-interest-request';

export const GET = async (): Promise<Response> =>
  Response.json(
    { message: 'Method not allowed. Submit the registration form instead.' },
    {
      status: 405,
      headers: { Allow: 'POST' },
    },
  );

export const POST = handleLaunchInterestRequest;
