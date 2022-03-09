import {Module} from '@nestjs/common';

import {EnvironmentModule} from '../../environment';
import {SgMailFactory} from './factories/sg-mail-factory';
import {MailConfiguration} from './mail-configuration';
import {MailService} from './services/mail-service';

export const mailModule = {
  providers: [
    {
      useClass: MailConfiguration,
      provide: 'IMailConfiguration',
    },
    {
      inject: ['IMailConfiguration'],
      useFactory: SgMailFactory.make,
      provide: 'SgMailService',
    },
    {
      useClass: MailService,
      provide: 'IMailService',
    },
  ],
  exports: ['IMailService'],
  imports: [EnvironmentModule],
};
@Module(mailModule)
export class MailModule {}
