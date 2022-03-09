import {Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {SessionRepository} from '../../infraestructure/database/repositories/session-repository';
import {SendMfaToken} from '../../infraestructure/mail/core/models/send-mfa-token';
import {SessionEntity} from '../entities/session-entity';
import {UserEntity} from '../entities/user-entity';
import {SessionNotAuthorized} from '../exceptions/session/session-not-authorized';
import {ISessionRepository} from '../interfaces/repositories/session-repository';
import {IMailService} from '../interfaces/services/mail/mail-service';
import {ISessionService} from '../interfaces/services/session/session-service';
import {CreateSessionModel} from './dtos/create-session';

export class SessionService implements ISessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private readonly sessionRepository: ISessionRepository,
    @Inject('IMailService') private readonly mailService: IMailService
  ) {}

  public async login(user: UserEntity, password: string): Promise<void> {
    user.validatePasswordOrFail(password);

    const mfaToken = user.mfa.generateToken();

    const sendMfaToken = SendMfaToken.make(
      user.getEmail(),
      user.name,
      mfaToken
    );

    await this.mailService.sendLoginMfaToken(sendMfaToken);
  }

  public async create(
    createSessionModel: CreateSessionModel
  ): Promise<SessionEntity> {
    const {user, password, token, deviceName} = createSessionModel;

    user.validatePasswordOrFail(password);

    user.mfa.validateTokenOrFail(token);

    const session = SessionEntity.make(deviceName);

    session.user = user;

    const createdSession = await this.sessionRepository.save(session);
    return createdSession;
  }

  public async findCurrentSessionOrFail(
    userId: string,
    sessionId: string
  ): Promise<SessionEntity> {
    const foundedSession = await this.sessionRepository.findOne({
      where: {
        id: sessionId,
        user: {
          id: userId,
        },
      },
    });

    if (!foundedSession) {
      throw SessionNotAuthorized.make();
    }

    return foundedSession;
  }
}
