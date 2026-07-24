import type { MiddlewareHandler } from 'hono';
import { handleLaunchInterestRequest } from '../lib/launch-interest-request';

export default (): MiddlewareHandler => async (context, next) => {
  const contentType = context.req.header('content-type') || '';

  if (
    context.req.method === 'POST' &&
    context.req.path === '/api/launch-interest' &&
    contentType.startsWith('multipart/form-data')
  ) {
    return handleLaunchInterestRequest(context.req.raw);
  }

  return next();
};
