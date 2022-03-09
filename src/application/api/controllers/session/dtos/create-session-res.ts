import {UserEntity} from '../../../../../core/entities/user-entity';
import {UserRes} from '../../user/dtos/user-res';

export class CreateSessionRes {
  user: UserRes;
  jwtToken: string;

  private constructor(user: UserEntity, jwtToken: string) {
    this.user = UserRes.make(user);
    this.jwtToken = jwtToken;
  }

  static make(user: UserEntity, jwtToken: string): CreateSessionRes {
    return new CreateSessionRes(user, jwtToken);
  }
}
