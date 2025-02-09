import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import { config } from './config';
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';
import { sentryConfig } from './config/sentry';
import knexConnection from './config/knexfile';

const knexInstance = knexConnection;

if (!knexInstance) {
  logger.error('Failed to initialize Knex instance. Exiting application.');
  process.exit(1);
}
const app = express();
// Attach knex to the app instance
app.set('knex', knexInstance);

if (config.sentry.dsn) {
  Sentry.init(sentryConfig);
}
// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, _res:Response, next: NextFunction) => {
  req.knex = knexInstance;
  next();
});
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