import  { NodeOptions } from '@sentry/node';
import { config } from './index';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export const sentryConfig: NodeOptions = {
  dsn: config.sentry.dsn,
  environment: config.env,
  enabled: config.isProduction,
  tracesSampleRate: 1.0,
  debug: !config.isProduction,
  attachStacktrace: true,
  normalizeDepth: 10,
  maxBreadcrumbs: 50,
  beforeSend(event) {
    // Don't send users' personal information to Sentry
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
  integrations: [
    Sentry.captureConsoleIntegration(),
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
    nodeProfilingIntegration(),
  ]
};