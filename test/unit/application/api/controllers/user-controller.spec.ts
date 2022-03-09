import {Mock} from 'moq.ts';

import {CreateAdminReq} from '../../../../../src/application/api/controllers/user/dtos/create-admin-req';
import {CreateCustomerReq} from '../../../../../src/application/api/controllers/user/dtos/create-customer-req';
import {ForgotPasswordReq} from '../../../../../src/application/api/controllers/user/dtos/forgot-password-req';
import {ActiveMfaReq} from '../../../../../src/application/api/controllers/user/dtos/mfa-active-req';
import {ResetPasswordReq} from '../../../../../src/application/api/controllers/user/dtos/reset-password-req';
import {UserRes} from '../../../../../src/application/api/controllers/user/dtos/user-res';
import {UserController} from '../../../../../src/application/api/controllers/user/user-controller';
import {UserEntity} from '../../../../../src/core/entities/user-entity';
import {IUserRepository} from '../../../../../src/core/interfaces/repositories/user-repository';
import {IUserService} from '../../../../../src/core/interfaces/services/user/user-service';
import {maeve} from '../../../../__hosts__/admins/maeve';

describe('Given User Controller', () => {
  const forgotPasswordSpy = jest.fn();
  const resetPasswordSpy = jest.fn();
  const createSpy = jest.fn();
  const activeMfaSpy = jest.fn();
  const userService = new Mock<IUserService>()
    .setup(mock => mock.forgotPassword)
    .returns(forgotPasswordSpy)
    .setup(mock => mock.resetPassword)
    .returns(resetPasswordSpy)
    .setup(mock => mock.create)
    .returns(createSpy)
    .setup(mock => mock.activeMfa)
    .returns(activeMfaSpy)
    .object();

  const findOneOrFailSpy = jest.fn();
  const userRepository = new Mock<IUserRepository>()
    .setup(mock => mock.findOneOrFail)
    .returns(findOneOrFailSpy)
    .object();

  const controller = new UserController(userService, userRepository);

  describe('When attempt to create user', () => {
    const user = new Mock<UserEntity>().object();

    it('Should create admin user', async () => {
      createSpy.mockResolvedValue(undefined);

      const createAdminUserReq = new CreateAdminReq();
      jest.spyOn(createAdminUserReq, 'makeUser').mockReturnValue(user);

      const response = await controller.createAdmin(createAdminUserReq);

      expect(response.payload).toBeUndefined();
    });

    it('Should create admin user without address complement', async () => {
      createSpy.mockResolvedValue(undefined);

      const createAdminUserReq = new CreateAdminReq();
      jest.spyOn(createAdminUserReq, 'makeUser').mockReturnValue(user);

      const response = await controller.createAdmin(createAdminUserReq);

      expect(response.payload).toBeUndefined();
    });

    it('Should create customer user', async () => {
      createSpy.mockResolvedValue(undefined);

      const createCustomerUserReq = new CreateCustomerReq();
      jest.spyOn(createCustomerUserReq, 'makeUser').mockReturnValue(user);

      const response = await controller.createCustomer(createCustomerUserReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When attempt to active user MFA', () => {
    it('Should active user mfa', async () => {
      activeMfaSpy.mockResolvedValue(undefined);

      const activeMfaReq = new ActiveMfaReq();
      activeMfaReq.email = maeve.email;
      activeMfaReq.token = '187284';

      const response = await controller.activeMfa(activeMfaReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When attempt to reset password', () => {
    it('Should forgot password', async () => {
      forgotPasswordSpy.mockResolvedValue(undefined);

      const forgotPasswordReq = new ForgotPasswordReq();
      forgotPasswordReq.email = maeve.email;

      const response = await controller.forgotPassword(forgotPasswordReq);

      expect(response.payload).toBeUndefined();
    });

    it('Should reset password', async () => {
      resetPasswordSpy.mockResolvedValue(undefined);

      const resetPasswordReq = new ResetPasswordReq();
      resetPasswordReq.email = maeve.email;
      resetPasswordReq.password = maeve.password;
      resetPasswordReq.token = '092986';

      const response = await controller.resetPassword(resetPasswordReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When attempt to find user from session', () => {
    it('Should find user', async () => {
      const user = new Mock<UserEntity>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();
      findOneOrFailSpy.mockResolvedValue(user);

      const userModel = new Mock<UserRes>()
        .setup(mock => mock.id)
        .returns(maeve.id)
        .object();

      jest.spyOn(UserRes, 'make').mockReturnValue(userModel);

      const response = await controller.refresh(maeve.id);

      expect(response.payload).toEqual(userModel);
    });
  });
});
