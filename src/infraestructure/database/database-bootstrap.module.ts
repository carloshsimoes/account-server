import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {EnvironmentModule} from '../environment';
import {ConnectionFactory} from './factories/connection-factory';
import {SessionRepository} from './repositories/session-repository';
import {UserRepository} from './repositories/user-repository';

export const databaseModule = {
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: ['IProcessEnvTextService', 'IProcessEnvNumberService'],
      useFactory: ConnectionFactory.make,
    }),
    TypeOrmModule.forFeature([UserRepository, SessionRepository]),
  ],
  exports: [TypeOrmModule],
};

@Module(databaseModule)
export class DatabaseBootstrap {}
