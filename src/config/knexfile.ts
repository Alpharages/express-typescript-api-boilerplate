import knex, { Knex } from 'knex';
import { config } from './index';

const knexConfig: Knex.Config = {
  client: config.database.client,
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

const knexConnection: Knex = knex(knexConfig);

export default knexConnection;