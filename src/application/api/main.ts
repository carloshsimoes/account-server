import 'reflect-metadata';

import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {ApiBootstrap} from './api-bootstrap.module';
import {IApiConfiguration} from './interfaces/api-configuration';

('use strict');

interface Server {
  app: INestApplication;
  port: number;
}

export const server = async (): Promise<Server> => {
  const app = await NestFactory.create(ApiBootstrap);

  const configs = app.get<IApiConfiguration>('IApiConfiguration');
  const port = configs.server.port;

  return {app, port};
};

server().then((server: Server) => {
  const app = server.app;
  const port = server.port;

  return app.listen(port);
});
