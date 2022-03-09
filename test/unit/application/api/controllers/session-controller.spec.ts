import {JwtService} from '@nestjs/jwt';
import {Mock} from 'moq.ts';

import {CreateSessionReq} from '../../../../../src/application/api/controllers/session/dtos/create-session-req';
import {CreateSessionRes} from '../../../../../src/application/api/controllers/session/dtos/create-session-res';
import {LoginReq} from '../../../../../src/application/api/controllers/session/dtos/login-req';
import {SessionRes} from '../../../../../src/application/api/controllers/session/dtos/session-res';
import {SessionController} from '../../../../../src/application/api/controllers/session/session-controller';
import {UserRes} from '../../../../../src/application/api/controllers/user/dtos/user-res';
import {SessionEntity} from '../../../../../src/core/entities/session-entity';
import {UserEntity} from '../../../../../src/core/entities/user-entity';
import {ISessionRepository} from '../../../../../src/core/interfaces/repositories/session-repository';
import {IUserRepository} from '../../../../../src/core/interfaces/repositories/user-repository';
import {ISessionService} from '../../../../../src/core/interfaces/services/session/session-service';
import {maeve, maeveSessions} from '../../../../__hosts__/admins/maeve';

describe('Given Session Controller', () => {
  const findOneOrFailSpy = jest.fn();
  const userRepository = new Mock<IUserRepository>()
    .setup(mock => mock.findOneOrFail)
    .returns(findOneOrFailSpy)
    .object();

  const loginSpy = jest.fn();
  const createSpy = jest.fn();
  const sessionService = new Mock<ISessionService>()
    .setup(mock => mock.login)
    .returns(loginSpy)
    .setup(mock => mock.create)
    .returns(createSpy)
    .object();

  const signSpy = jest.fn();
  const jwtService = new Mock<JwtService>()
    .setup(mock => mock.sign)
    .returns(signSpy)
    .object();

  const findSpy = jest.fn();
  const sessionRepository = new Mock<ISessionRepository>()
    .setup(mock => mock.find)
    .returns(findSpy)
    .object();

  const controller = new SessionController(
    userRepository,
    sessionService,
    jwtService,
    sessionRepository
  );

  describe('When attempt to login user', () => {
    const user = new Mock<UserEntity>()
      .setup(mock => mock.getEmail)
      .returns(() => maeve.email)
      .setup(mock => mock.validatePasswordOrFail)
      .returns(() => {})
      .object();

    it('Should login by email', async () => {
      findOneOrFailSpy.mockResolvedValue(user);

      createSpy.mockResolvedValue(undefined);

      const loginEmailReq = new LoginReq();
      loginEmailReq.email = maeve.email;
      loginEmailReq.password = maeve.password;

      const response = await controller.login(loginEmailReq);

      expect(response.payload).toBeUndefined();
    });

    it('Should login by cpf', async () => {
      findOneOrFailSpy.mockResolvedValue(user);

      createSpy.mockResolvedValue(undefined);

      const loginReq = new LoginReq();
      loginReq.cpf = maeve.cpf;
      loginReq.password = maeve.password;

      const response = await controller.login(loginReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When attempt to create session', () => {
    const user = new Mock<UserEntity>()
      .setup(mock => mock.id)
      .returns(maeve.id)
      .object();

    it('Should create session by email', async () => {
      findOneOrFailSpy.mockResolvedValue(user);

      const sessionId = maeveSessions[0].id;
      const session = new Mock<SessionEntity>()
        .setup(mock => mock.id)
        .returns(sessionId)
        .setup(mock => mock.user)
        .returns(user)
        .object();
      createSpy.mockResolvedValue(session);

      const jwtToken = 'JWT-GENERATED-TOKEN';
      signSpy.mockReturnValue(jwtToken);

      const createSessionEmailReq = new CreateSessionReq();
      createSessionEmailReq.email = maeve.email;
      createSessionEmailReq.password = maeve.password;
      createSessionEmailReq.token = '123456';
      createSessionEmailReq.deviceName = maeveSessions[0].deviceName;

      const userModel = new Mock<UserRes>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();

      const createSessionRes = {user: userModel, jwtToken};

      jest.spyOn(CreateSessionRes, 'make').mockReturnValue(createSessionRes);

      const response = await controller.create(createSessionEmailReq);

      expect(response.payload).toEqual(createSessionRes);
    });

    it('Should create session by cpf', async () => {
      findOneOrFailSpy.mockResolvedValue(user);

      const sessionId = maeveSessions[0].id;
      const session = new Mock<SessionEntity>()
        .setup(mock => mock.id)
        .returns(sessionId)
        .setup(mock => mock.user)
        .returns(user)
        .object();
      createSpy.mockResolvedValue(session);

      const jwtToken = 'JWT-GENERATED-TOKEN';
      signSpy.mockReturnValue(jwtToken);

      const createSessionReq = new CreateSessionReq();
      createSessionReq.cpf = maeve.cpf;
      createSessionReq.password = maeve.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = maeveSessions[0].deviceName;

      const userModel = new Mock<UserRes>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();

      const createSessionRes = {user: userModel, jwtToken};

      jest.spyOn(CreateSessionRes, 'make').mockReturnValue(createSessionRes);

      const response = await controller.create(createSessionReq);

      expect(response.payload).toEqual(createSessionRes);
    });
  });

  describe('When attempt to list sessions', () => {
    it('Should list sessions from user session', async () => {
      const session = new Mock<SessionEntity>()
        .setup(mock => mock.id)
        .returns(maeveSessions[0].id)
        .object();

      findSpy.mockResolvedValue([session]);

      const sessionModel = new Mock<SessionRes>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();

      jest.spyOn(SessionRes, 'makeList').mockReturnValue([sessionModel]);

      const response = await controller.list(maeve.id);

      expect(response.payload).toEqual([sessionModel]);
    });
  });
});
