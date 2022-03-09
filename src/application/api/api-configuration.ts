import {Inject} from '@nestjs/common';
import {Algorithm} from 'jsonwebtoken';

import {IEnvironment} from '../../infraestructure/environment';
import {IApiConfiguration} from './interfaces/api-configuration';

export class ApiConfiguration implements IApiConfiguration {
  public server = {
    port: this.processEnvNumberService.getValueByKey('API_PORT'),
  };

  public jwt = {
    publicKey: this.processEnvBufferService.getValueByKey(
      'JWT_PUBLIC_KEY_PATH'
    ),
    algorithm: this.processEnvTextService.getValueByKey('JWT_ALGORITHM'),
  };

  constructor(
    @Inject('IProcessEnvNumberService')
    private processEnvNumberService: IEnvironment<number>,
    @Inject('IProcessEnvBufferService')
    private processEnvBufferService: IEnvironment<Buffer>,
    @Inject('IProcessEnvTextService')
    private processEnvTextService: IEnvironment<Algorithm>
  ) {}
}
