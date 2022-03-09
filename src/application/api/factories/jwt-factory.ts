import {JwtModuleOptions} from '@nestjs/jwt';
import {Algorithm} from 'jsonwebtoken';

import {IEnvironment} from '../../../infraestructure/environment';

export class JwtFactory {
  public static make(
    processEnvBufferService: IEnvironment<Buffer>,
    processEnvNumberService: IEnvironment<number>,
    processEnvTextService: IEnvironment<Algorithm>
  ): JwtModuleOptions {
    return {
      privateKey: processEnvBufferService.getValueByKey('JWT_PRIVATE_KEY_PATH'),
      publicKey: processEnvBufferService.getValueByKey('JWT_PUBLIC_KEY_PATH'),
      signOptions: {
        expiresIn: processEnvNumberService.getValueByKey('JWT_EXPIRES_IN'),
        algorithm: processEnvTextService.getValueByKey('JWT_ALGORITHM'),
      },
    };
  }
}
