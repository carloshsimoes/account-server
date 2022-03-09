import {SessionEntity} from '../../../entities/session-entity';
import {UserEntity} from '../../../entities/user-entity';
import {CreateSessionModel} from '../../../services/dtos/create-session';

export interface ISessionService {
  login(user: UserEntity, password: string): Promise<void>;
  create(createSession: CreateSessionModel): Promise<SessionEntity>;
  findCurrentSessionOrFail(
    userId: string,
    sessionId: string
  ): Promise<SessionEntity>;
}
