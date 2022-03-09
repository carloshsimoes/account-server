import {SessionEntity} from '../../../../../core/entities/session-entity';
import {UserRes} from '../../user/dtos/user-res';

export class SessionRes {
  id: string;
  deviceName: string;
  user: UserRes;

  private constructor(session: SessionEntity) {
    this.id = session.id;
    this.deviceName = session.deviceName;
    this.user = UserRes.make(session.user);
  }

  static make(session: SessionEntity): SessionRes {
    return new SessionRes(session);
  }

  static makeList(sessions: SessionEntity[]): SessionRes[] {
    return sessions.map(address => SessionRes.make(address));
  }
}
