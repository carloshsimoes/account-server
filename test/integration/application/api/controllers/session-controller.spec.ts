import {Test} from '@nestjs/testing';
import * as bcryptjs from 'bcryptjs';
import {authenticator} from 'otplib';

import {apiModule} from '../../../../../src/application/api/api-bootstrap.module';
import {CreateSessionReq} from '../../../../../src/application/api/controllers/session/dtos/create-session-req';
import {LoginReq} from '../../../../../src/application/api/controllers/session/dtos/login-req';
import {SessionRes} from '../../../../../src/application/api/controllers/session/dtos/session-res';
import {SessionController} from '../../../../../src/application/api/controllers/session/session-controller';
import {UserRes} from '../../../../../src/application/api/controllers/user/dtos/user-res';
import {EntityNotFound} from '../../../../../src/core/exceptions/entity-not-found';
import {InactiveMfa} from '../../../../../src/core/exceptions/user/inactive-mfa';
import {IncorrectMfaToken} from '../../../../../src/core/exceptions/user/incorrect-mfa-token';
import {IncorrectPassword} from '../../../../../src/core/exceptions/user/incorrect-password';
import {maeve, maeveSessionEntity} from '../../../../__hosts__/admins/maeve';
import {clementine} from '../../../../__hosts__/customers/clementine';
import {dolores, doloresEntity} from '../../../../__hosts__/customers/dolores';
import {pickett, pickettEntity} from '../../../../__hosts__/customers/pickett';
import {william} from '../../../../__hosts__/guests/william';

describe('Given Session Controller', () => {
  let sessionController: SessionController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    sessionController = moduleRef.get<SessionController>(SessionController);
  });

  describe('When William "Man in Black" attempt to login by email', () => {
    it('Should throw UserNotFound', async () => {
      const loginEmailReq = new LoginReq();
      loginEmailReq.email = william.email;
      loginEmailReq.password = william.password;

      await expect(() =>
        sessionController.login(loginEmailReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When William "Man in Black" attempt to login by cpf', () => {
    it('Should throw UserNotFound', async () => {
      const loginEmailReq = new LoginReq();
      loginEmailReq.cpf = william.cpf;
      loginEmailReq.password = william.password;

      await expect(() =>
        sessionController.login(loginEmailReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When Dolores attempt to login by email with wrong password', () => {
    it('Should throw IncorrectPassword', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(false);
      const loginEmailReq = new LoginReq();
      loginEmailReq.email = dolores.email;
      loginEmailReq.password = 'NotDoloresPasssword';

      await expect(() =>
        sessionController.login(loginEmailReq)
      ).rejects.toThrow(IncorrectPassword.make());
    });
  });

  describe('When Dolores attempt to login by email with correct password', () => {
    it('Should create the MFA for create session', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      const loginEmailReq = new LoginReq();
      loginEmailReq.email = dolores.email;
      loginEmailReq.password = dolores.password;

      const response = await sessionController.login(loginEmailReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When Dolores attempt to login by cpf with correct password', () => {
    it('Should create the MFA for create session', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      const loginEmailReq = new LoginReq();
      loginEmailReq.cpf = dolores.cpf;
      loginEmailReq.password = dolores.password;

      const response = await sessionController.login(loginEmailReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When William "Man in Black" host attempt to create session by email', () => {
    it('Should throw UserNotFound', async () => {
      const createSessionReq = new CreateSessionReq();
      createSessionReq.email = william.email;
      createSessionReq.password = william.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'William integration tests device';

      await expect(() =>
        sessionController.create(createSessionReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When William "Man in Black" host attempt to create session by cpf', () => {
    it('Should throw UserNotFound', async () => {
      const createSessionReq = new CreateSessionReq();
      createSessionReq.cpf = william.cpf;
      createSessionReq.password = william.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'William integration tests device';

      await expect(() =>
        sessionController.create(createSessionReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When William "Man in Black" host attempt to create session without email or cpf', () => {
    it('Should throw UserNotFound', async () => {
      const createSessionReq = new CreateSessionReq();
      createSessionReq.password = william.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'William integration tests device';

      await expect(() =>
        sessionController.create(createSessionReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When Dolores attempt to create session by email with wrong mfa token', () => {
    it('Should throw IncorrectMfaToken', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      jest.spyOn(authenticator, 'check').mockReturnValue(false);
      const createSessionReq = new CreateSessionReq();
      createSessionReq.email = dolores.email;
      createSessionReq.password = dolores.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'Dolores integration tests device';

      await expect(() =>
        sessionController.create(createSessionReq)
      ).rejects.toThrow(IncorrectMfaToken.make());
    });
  });

  describe('When Sheriff Pickett attempt to create session by email with correct mfa token', () => {
    it('Should login', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      jest.spyOn(authenticator, 'check').mockReturnValue(true);
      const createSessionReq = new CreateSessionReq();
      createSessionReq.email = pickett.email;
      createSessionReq.password = pickett.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'Sheriff Pickett integration tests device';

      const response = await sessionController.create(createSessionReq);

      expect(response.payload).toEqual({
        jwtToken: expect.any(String),
        user: UserRes.make(pickettEntity),
      });
    });
  });

  describe('When Dolores attempt to create session by cpf with correct mfa token', () => {
    it('Should login', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      jest.spyOn(authenticator, 'check').mockReturnValue(true);
      const createSessionReq = new CreateSessionReq();
      createSessionReq.cpf = dolores.cpf;
      createSessionReq.password = dolores.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'Dolores integration tests device';

      const response = await sessionController.create(createSessionReq);

      expect(response.payload).toEqual({
        jwtToken: expect.any(String),
        user: UserRes.make(doloresEntity),
      });
    });
  });

  describe('When Clementine attempt to create session by cpf with inactive mfa', () => {
    it('Should throw InactiveMfa', async () => {
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      const createSessionReq = new CreateSessionReq();
      createSessionReq.email = clementine.email;
      createSessionReq.password = clementine.password;
      createSessionReq.token = '123456';
      createSessionReq.deviceName = 'Clementine integration tests device';

      await expect(() =>
        sessionController.create(createSessionReq)
      ).rejects.toThrow(InactiveMfa.make());
    });
  });

  describe('When Maeve attempt to list her sessions', () => {
    it('Should list Maeve sessions', async () => {
      const response = await sessionController.list(maeve.id);

      expect(response.payload).toEqual(
        SessionRes.makeList([maeveSessionEntity])
      );
    });
  });
});
