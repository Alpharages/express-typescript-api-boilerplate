import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  SENTRY_DSN: z.string().optional(),
  BETTER_STACK_TOKEN: z.string().optional(),
});

const envVars = envSchema.parse(process.env);

export const config = {
  env: envVars.NODE_ENV,
  port: parseInt(envVars.PORT, 10),
  isProduction: envVars.NODE_ENV === 'production',
  database: {
    client: envVars.DATABASE_CLIENT,
    url: envVars.DATABASE_URL,
  },
  sentry: {
    dsn: envVars.SENTRY_DSN,
  },
  betterStack: {
    token: envVars.BETTER_STACK_TOKEN,
  },
} as const;