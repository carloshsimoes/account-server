import {AccessLevel} from '../../../../core/enums/access-level';
import {IJwtContent} from '../../interfaces/jwt-content';

export interface IUserSession extends IJwtContent {
  accessLevel: AccessLevel;
}

export interface IUserSessionRequest {
  user: IUserSession;
}
