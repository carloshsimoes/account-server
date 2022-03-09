import {EntityRepository} from 'typeorm';

import {UserEntity} from '../../../core/entities/user-entity';
import {IUserRepository} from '../../../core/interfaces/repositories/user-repository';
import {BaseRepository} from './base-repository';

@EntityRepository(UserEntity)
export class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository {}
