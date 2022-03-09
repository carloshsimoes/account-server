import {BaseRepository} from '../../../infraestructure/database/repositories/base-repository';
import {UserEntity} from '../../entities/user-entity';

export type IUserRepository = BaseRepository<UserEntity>;
