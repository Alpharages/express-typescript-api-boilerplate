import { config } from './index';

export const betterStackConfig = {
  transport: config.isProduction
    ? {
      target: '@logtail/pino',
      options: {
        sourceToken: config.betterStack.token,
        batchSize: 1,
        ignoreExceptions: false,
      },
    }
    : {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  level: config.isProduction ? 'info' : 'debug',
  base: {
    env: config.env,
    version: process.env.npm_package_version,
  },
};