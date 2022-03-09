import {Module} from '@nestjs/common';

import {DatabaseBootstrap} from '../infraestructure/database/database-bootstrap.module';
import {MailModule} from '../infraestructure/mail';
import {SessionService} from './services/session-service';
import {UserService} from './services/user-service';

@Module({
  providers: [
    {
      useClass: UserService,
      provide: 'IUserService',
    },
    {
      useClass: SessionService,
      provide: 'ISessionService',
    },
  ],
  exports: ['IUserService', 'ISessionService'],
  imports: [DatabaseBootstrap, MailModule],
})
export class CoreBootstrap {}
