import {TypeOrmModuleOptions} from '@nestjs/typeorm';

import {AddressEntity} from '../../../core/entities/address-entity';
import {MfaEntity} from '../../../core/entities/mfa-entity';
import {SessionEntity} from '../../../core/entities/session-entity';
import {UserEntity} from '../../../core/entities/user-entity';
import {IEnvironment} from '../../environment';

export class ConnectionFactory {
  public static make(
    processEnvTextService: IEnvironment<string>,
    processEnvNumberService: IEnvironment<number>
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: processEnvTextService.getValueByKey('DB_HOST'),
      port: processEnvNumberService.getValueByKey('DB_PORT'),
      username: processEnvTextService.getValueByKey('DB_USERNAME'),
      password: processEnvTextService.getValueByKey('DB_PASSWORD'),
      database: processEnvTextService.getValueByKey('DB_DATABASE'),
      entities: [UserEntity, SessionEntity, AddressEntity, MfaEntity],
    };
  }
}
