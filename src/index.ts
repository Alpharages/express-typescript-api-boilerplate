import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import { config } from './config';
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';
import { sentryConfig } from '@/config/sentry';

const app = express();

if (config.sentry.dsn) {
  Sentry.init(sentryConfig);
}
// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
if (config.sentry.dsn) {
  Sentry.setupExpressErrorHandler(app);
}

app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});