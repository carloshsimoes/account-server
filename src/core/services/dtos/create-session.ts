import {UserEntity} from '../../entities/user-entity';

export interface CreateSessionModel {
  user: UserEntity;
  password: string;
  token: string;
  deviceName: string;
}
