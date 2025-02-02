import { config } from './src/config';
import { Knex } from 'knex';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: config.database.url,
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
    extension: 'ts',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default knexConfig;