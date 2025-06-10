import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Pokemon } from '../modules/pokemons/entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: process.env.PGSQL_PORT,
  username: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_NAME,
  entities: [Pokemon],
  migrations: ['src/database/migration/**/*.js'],
  schema: process.env.PGSQL_SCHEMA,
  synchronize: false,
  logging: false,
});
