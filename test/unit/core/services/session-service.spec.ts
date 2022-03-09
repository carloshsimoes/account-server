import {Mock} from 'moq.ts';

import {MfaEntity} from '../../../../src/core/entities/mfa-entity';
import {SessionEntity} from '../../../../src/core/entities/session-entity';
import {UserEntity} from '../../../../src/core/entities/user-entity';
import {SessionNotAuthorized} from '../../../../src/core/exceptions/session/session-not-authorized';
import {ISessionRepository} from '../../../../src/core/interfaces/repositories/session-repository';
import {IMailService} from '../../../../src/core/interfaces/services/mail/mail-service';
import {SessionService} from '../../../../src/core/services/session-service';
import {maeve, maeveSessions} from '../../../__hosts__/admins/maeve';

describe('Given Session Service', () => {
  const saveSpy = jest.fn();
  const findOneSpy = jest.fn();
  const sessionRepository = new Mock<ISessionRepository>()
    .setup(mock => mock.save)
    .returns(saveSpy)
    .setup(mock => mock.findOne)
    .returns(findOneSpy)
    .object();

  const sendLoginMfaTokenSpy = jest.fn();
  const mailService = new Mock<IMailService>()
    .setup(mock => mock.sendLoginMfaToken)
    .returns(sendLoginMfaTokenSpy)
    .object();

  const service = new SessionService(sessionRepository, mailService);

  describe('When user login', () => {
    it('Should login', async () => {
      const generatedToken = 'c87657f3-56a9-42f3-800c-95adcbfbd60d';
      const mfa = new Mock<MfaEntity>()
        .setup(mock => mock.generateToken)
        .returns(() => generatedToken)
        .object();

      const user = new Mock<UserEntity>()
        .setup(mock => mock.getEmail)
        .returns(() => maeve.email)
        .setup(mock => mock.validatePasswordOrFail)
        .returns(() => {})
        .setup(mock => mock.mfa)
        .returns(mfa)
        .object();

      sendLoginMfaTokenSpy.mockResolvedValue(undefined);

      const result = await service.login(user, maeve.password);

      expect(result).toBeUndefined();
    });
  });

  describe('When user create session', () => {
    it('Should create session', async () => {
      const mfa = new Mock<MfaEntity>()
        .setup(mock => mock.validateTokenOrFail)
        .returns(() => {})
        .object();

      const session = new Mock<SessionEntity>().object();

      const user = new Mock<UserEntity>()
        .setup(mock => mock.validatePasswordOrFail)
        .returns(() => {})
        .setup(mock => mock.mfa)
        .returns(mfa)
        .object();

      const createSession = {
        user,
        password: maeve.password,
        token: 'GENERATED-MFA-TOKEN',
        deviceName: maeveSessions[0].deviceName,
      };

      saveSpy.mockResolvedValue(session);

      const createdSession = await service.create(createSession);

      expect(createdSession).toEqual(session);
    });
  });

  describe('When user attempt to find current session', () => {
    it('Should find current session', async () => {
      const user = new Mock<UserEntity>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();

      const session = new Mock<SessionEntity>()
        .setup(mock => mock.id)
        .returns(maeveSessions[0].id)
        .setup(mock => mock.user)
        .returns(user)
        .object();

      findOneSpy.mockResolvedValue(session);

      const currentSession = await service.findCurrentSessionOrFail(
        maeve.id,
        maeveSessions[0].id
      );

      expect(currentSession).toEqual(session);
    });

    it('Should throw SessionNotAuthorized', async () => {
      findOneSpy.mockResolvedValue(undefined);

      await expect(() =>
        service.findCurrentSessionOrFail(
          '1318a021-b76a-4faa-a101-cea3f5e49f50',
          'b1370c23-96fa-4aaa-b574-33aeaaed4005'
        )
      ).rejects.toThrow(SessionNotAuthorized.make());
    });
  });
});
