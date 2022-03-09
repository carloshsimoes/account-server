import {UserEntity} from '../../../entities/user-entity';

export interface IUserService {
  create(user: UserEntity): Promise<void>;
  activeMfa(email: string, token: string): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(email: string, token: string, password: string): Promise<void>;
}
