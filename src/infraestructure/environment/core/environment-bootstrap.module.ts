import {Module} from '@nestjs/common';

import {ProcessEnvBufferService} from './services/process-env-buffer-service';
import {ProcessEnvNumberService} from './services/process-env-number-service';
import {ProcessEnvService} from './services/process-env-service';
import {ProcessEnvTextService} from './services/process-env-text-service';

export const environmentModule = {
  providers: [
    {
      useFactory: () => process.env,
      provide: 'ProcessEnv',
    },
    {
      useClass: ProcessEnvService,
      provide: 'IProcessEnvService',
    },
    {
      useClass: ProcessEnvTextService,
      provide: 'IProcessEnvTextService',
    },
    {
      useClass: ProcessEnvNumberService,
      provide: 'IProcessEnvNumberService',
    },
    {
      useClass: ProcessEnvBufferService,
      provide: 'IProcessEnvBufferService',
    },
  ],
  exports: [
    'IProcessEnvTextService',
    'IProcessEnvNumberService',
    'IProcessEnvBufferService',
  ],
};
@Module(environmentModule)
export class EnvironmentModule {}
