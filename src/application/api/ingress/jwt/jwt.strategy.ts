import {Inject} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {ISessionService} from '../../../../core/interfaces/services/session/session-service';
import {IApiConfiguration} from '../../interfaces/api-configuration';
import {IJwtContent} from '../../interfaces/jwt-content';
import {IUserSession} from '../user-session/user-session-request';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('ISessionService')
    private readonly sessionService: ISessionService,
    @Inject('IApiConfiguration') apiConfiguration: IApiConfiguration
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfiguration.jwt.publicKey,
      algorithms: [apiConfiguration.jwt.algorithm],
    });
  }

  async validate(payload: IJwtContent): Promise<IUserSession> {
    const {userId, sessionId} = payload;

    const foundedSession = await this.sessionService.findCurrentSessionOrFail(
      userId,
      sessionId
    );

    return {
      ...payload,
      accessLevel: foundedSession.user.getAccessLevel(),
    };
  }
}
