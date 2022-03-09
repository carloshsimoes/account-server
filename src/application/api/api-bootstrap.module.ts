import {Module, ValidationPipe} from '@nestjs/common';
import {APP_FILTER, APP_GUARD, APP_PIPE} from '@nestjs/core';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {CoreBootstrap} from '../../core/core-bootstrap.module';
import {DatabaseBootstrap} from '../../infraestructure/database/database-bootstrap.module';
import {EnvironmentModule} from '../../infraestructure/environment/core/environment-bootstrap.module';
import {ApiConfiguration} from './api-configuration';
import {SessionController} from './controllers/session/session-controller';
import {UserController} from './controllers/user/user-controller';
import {CoreExceptionsFilter} from './filters/core-exceptions.filter';
import {JwtFactory} from './factories/jwt-factory';
import {JwtGuard} from './ingress/jwt/jwt.guard';
import {JwtStrategy} from './ingress/jwt/jwt.strategy';

export const apiModule = {
  providers: [
    {
      useClass: ApiConfiguration,
      provide: 'IApiConfiguration',
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({transform: true}),
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CoreExceptionsFilter,
    },
    JwtStrategy,
  ],
  controllers: [SessionController, UserController],
  imports: [
    CoreBootstrap,
    DatabaseBootstrap,
    PassportModule,
    EnvironmentModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [
        'IProcessEnvBufferService',
        'IProcessEnvNumberService',
        'IProcessEnvTextService',
      ],
      useFactory: JwtFactory.make,
    }),
  ],
};

@Module(apiModule)
export class ApiBootstrap {}
