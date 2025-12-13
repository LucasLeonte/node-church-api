const Knex = require('knex');
const { Model } = require('objection');
const env = require('./env');

const knexConfig = {
  client: env.DB_CLIENT,
  connection: {
    filename: env.DB_FILENAME
  },
  useNullAsDefault: true,
  pool: { min: 1, max: 5 },
  migrations: { directory: './src/db/migrations' },
  seeds: { directory: './src/db/seeds' }
};

const knex = Knex(knexConfig);
Model.knex(knex);

module.exports = { knex, Model };
