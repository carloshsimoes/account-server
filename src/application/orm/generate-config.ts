import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {ConnectionOptions} from 'typeorm';

dotenv.config();

const ormFile: ConnectionOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  logging: false,
  entities: ['./src/core/**/*-entity.ts'],
  migrations: ['./src/application/orm/migration/*.ts'],
  cli: {
    migrationsDir: './src/application/orm/migration',
  },
};

fs.writeFile('./ormconfig.json', JSON.stringify(ormFile, null, 2), err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
