import {BaseRepository} from '../../../infraestructure/database/repositories/base-repository';
import {SessionEntity} from '../../entities/session-entity';

export type ISessionRepository = BaseRepository<SessionEntity>;
