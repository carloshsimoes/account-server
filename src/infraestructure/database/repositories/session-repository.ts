import {EntityRepository} from 'typeorm';

import {SessionEntity} from '../../../core/entities/session-entity';
import {ISessionRepository} from '../../../core/interfaces/repositories/session-repository';
import {BaseRepository} from './base-repository';

@EntityRepository(SessionEntity)
export class SessionRepository
  extends BaseRepository<SessionEntity>
  implements ISessionRepository {}
