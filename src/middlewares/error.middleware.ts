import { ErrorRequestHandler } from 'express';
import * as Sentry from '@sentry/node';
import { config } from '@/config';
import { logger } from '@/utils/logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);

  if (config.sentry.dsn) {
    Sentry.captureException(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status,
    message,
    stack: config.isProduction ? undefined : err.stack,
  });
};