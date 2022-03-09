import {Mock} from 'moq.ts';

import {MfaEntity} from '../../../../src/core/entities/mfa-entity';
import {UserEntity} from '../../../../src/core/entities/user-entity';
import {UserAlreadyExists} from '../../../../src/core/exceptions/user/user-already-exists';
import {IUserRepository} from '../../../../src/core/interfaces/repositories/user-repository';
import {IMailService} from '../../../../src/core/interfaces/services/mail/mail-service';
import {UserService} from '../../../../src/core/services/user-service';
import {maeve} from '../../../__hosts__/admins/maeve';

describe('Given User Service', () => {
  const findOneSpy = jest.fn();
  const findOneOrFailSpy = jest.fn();
  const saveUserSpy = jest.fn();

  const userRepository = new Mock<IUserRepository>()
    .setup(mock => mock.findOne)
    .returns(findOneSpy)
    .setup(mock => mock.findOneOrFail)
    .returns(findOneOrFailSpy)
    .setup(mock => mock.save)
    .returns(saveUserSpy)
    .object();

  const sendVerifyAccountMfaTokenSpy = jest.fn();
  const sendForgetPasswordMfaTokenSpy = jest.fn();
  const mailService = new Mock<IMailService>()
    .setup(mock => mock.sendActiveMfaToken)
    .returns(sendVerifyAccountMfaTokenSpy)
    .setup(mock => mock.sendForgetPasswordMfaToken)
    .returns(sendForgetPasswordMfaTokenSpy)
    .object();

  const service = new UserService(userRepository, mailService);

  describe('When create user', () => {
    const token = 'GENERATED-TOKEN';
    const mfa = new Mock<MfaEntity>()
      .setup(mock => mock.generateToken)
      .returns(() => token)
      .object();

    const user = new Mock<UserEntity>()
      .setup(mock => mock.getEmail)
      .returns(() => maeve.email)
      .setup(mock => mock.getCpf)
      .returns(() => maeve.cpf)
      .setup(mock => mock.mfa)
      .returns(mfa)
      .object();

    it('Should create user', async () => {
      findOneSpy.mockResolvedValue(null);
      saveUserSpy.mockResolvedValue(user);
      sendVerifyAccountMfaTokenSpy.mockResolvedValue(undefined);

      const result = await service.create(user);

      expect(result).toBeUndefined();
    });

    it('Should throw EntityAlreadyExists', async () => {
      findOneSpy.mockResolvedValue(user);

      await expect(() => service.create(user)).rejects.toThrow(
        UserAlreadyExists.make()
      );
    });
  });

  describe('When user active mfa', () => {
    const token = 'GENERATED-TOKEN';

    it('Should active user mfa', async () => {
      const mfaMock = new Mock<MfaEntity>();
      mfaMock.setup(mock => mock.validateTokenOrFail).returns(() => {});
      mfaMock.setup(mock => mock.activeMfaOrFail).returns(() => {});

      const userMock = new Mock<UserEntity>();
      userMock.setup(mock => mock.mfa).returns(mfaMock.object());
      const user = userMock.object();

      findOneOrFailSpy.mockResolvedValue(user);

      const result = await service.activeMfa(maeve.email, token);

      expect(result).toBeUndefined();
    });
  });

  describe('When user forgot password', () => {
    it('Should send email with generated mfa token', async () => {
      const mfaMock = new Mock<MfaEntity>();
      const token = 'GENERATED-TOKEN';
      mfaMock.setup(mock => mock.generateToken).returns(() => token);

      const userMock = new Mock<UserEntity>();
      userMock.setup(mock => mock.getEmail).returns(() => maeve.email);
      userMock.setup(mock => mock.mfa).returns(mfaMock.object());
      const user = userMock.object();

      findOneOrFailSpy.mockResolvedValue(user);

      sendForgetPasswordMfaTokenSpy.mockResolvedValue(undefined);

      const result = await service.forgotPassword(maeve.email);

      expect(result).toBeUndefined();
    });
  });

  describe('When user reset password', () => {
    const token = 'GENERATED-TOKEN';

    it('Should change current password', async () => {
      const mfaMock = new Mock<MfaEntity>();
      mfaMock.setup(mock => mock.validateTokenOrFail).returns(() => {});

      const userMock = new Mock<UserEntity>();
      userMock.setup(mock => mock.mfa).returns(mfaMock.object());
      userMock.setup(mock => mock.setPassword).returns(() => {});
      const user = userMock.object();

      findOneOrFailSpy.mockResolvedValue(user);

      saveUserSpy.mockResolvedValue(user);

      const result = await service.resetPassword(
        maeve.email,
        token,
        maeve.password
      );

      expect(result).toBeUndefined();
    });
  });
});
