import {Test} from '@nestjs/testing';
import {authenticator} from 'otplib';

import {apiModule} from '../../../../../src/application/api/api-bootstrap.module';
import {CreateAdminReq} from '../../../../../src/application/api/controllers/user/dtos/create-admin-req';
import {CreateCustomerReq} from '../../../../../src/application/api/controllers/user/dtos/create-customer-req';
import {ForgotPasswordReq} from '../../../../../src/application/api/controllers/user/dtos/forgot-password-req';
import {ActiveMfaReq} from '../../../../../src/application/api/controllers/user/dtos/mfa-active-req';
import {ResetPasswordReq} from '../../../../../src/application/api/controllers/user/dtos/reset-password-req';
import {UserRes} from '../../../../../src/application/api/controllers/user/dtos/user-res';
import {UserController} from '../../../../../src/application/api/controllers/user/user-controller';
import {EntityNotFound} from '../../../../../src/core/exceptions/entity-not-found';
import {InactiveMfa} from '../../../../../src/core/exceptions/user/inactive-mfa';
import {IncorrectMfaToken} from '../../../../../src/core/exceptions/user/incorrect-mfa-token';
import {UserAlreadyExists} from '../../../../../src/core/exceptions/user/user-already-exists';
import {maeve, maeveEntity} from '../../../../__hosts__/admins/maeve';
import {craddock} from '../../../../__hosts__/customers/craddock';
import {foss} from '../../../../__hosts__/customers/foss';
import {lawrence} from '../../../../__hosts__/customers/lawrence';
import {pickett} from '../../../../__hosts__/customers/pickett';
import {rebus} from '../../../../__hosts__/customers/rebus';
import {renato, renatoEntity} from '../../../../__hosts__/customers/renato';
import {roe} from '../../../../__hosts__/customers/roe';
import {felix} from '../../../../__hosts__/guests/felix';
import {hector} from '../../../../__hosts__/guests/hector';
import {william} from '../../../../__hosts__/guests/william';

describe('Given User Controller', () => {
  let userController: UserController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('When Hector attempt to create his user', () => {
    it('Should create Hector as customer user', async () => {
      const createCustomerUserReq = new CreateCustomerReq();
      createCustomerUserReq.name = hector.name;
      createCustomerUserReq.email = hector.email;
      createCustomerUserReq.cpf = hector.cpf;
      createCustomerUserReq.password = hector.password;

      const response = await userController.createCustomer(
        createCustomerUserReq
      );

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When Maeve attempt to create Felix user', () => {
    it('Should create Felix as admin user', async () => {
      const createAdminUserReq = new CreateAdminReq();
      createAdminUserReq.name = felix.name;
      createAdminUserReq.email = felix.email;
      createAdminUserReq.cpf = felix.cpf;
      createAdminUserReq.password = felix.password;
      createAdminUserReq.street = felix.addresses[0].street;
      createAdminUserReq.complement = felix.addresses[0].complement;
      createAdminUserReq.neighborhood = felix.addresses[0].neighborhood;
      createAdminUserReq.city = felix.addresses[0].city;
      createAdminUserReq.state = felix.addresses[0].state;
      createAdminUserReq.zipCode = felix.addresses[0].zipCode;

      const response = await userController.createAdmin(createAdminUserReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When Lawrence attempt to register for the second time', () => {
    it('Should throw EntityAlreadyExists', async () => {
      const createCustomerUserReq = new CreateCustomerReq();
      createCustomerUserReq.name = lawrence.name;
      createCustomerUserReq.email = lawrence.email;
      createCustomerUserReq.cpf = lawrence.cpf;
      createCustomerUserReq.password = lawrence.password;

      await expect(() =>
        userController.createCustomer(createCustomerUserReq)
      ).rejects.toThrow(UserAlreadyExists.make());
    });
  });

  describe('When Lawrence attempt to active mfa', () => {
    it('Should active Lawrence mfa', async () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(true);

      const activeMfaReq = new ActiveMfaReq();
      activeMfaReq.email = lawrence.email;
      activeMfaReq.token = '123456';

      const response = await userController.activeMfa(activeMfaReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When William "Man in Black" attempt to active mfa', () => {
    it('Should throw UserNotFound', async () => {
      const activeMfaReq = new ActiveMfaReq();
      activeMfaReq.email = william.email;
      activeMfaReq.token = '123456';

      await expect(() =>
        userController.activeMfa(activeMfaReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When Deputy Roe attempt to active mfa with incorrect token', () => {
    it('Should throw IncorrectMfaToken', async () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(false);

      const activeMfaReq = new ActiveMfaReq();
      activeMfaReq.email = roe.email;
      activeMfaReq.token = '8d543c63-1cd6-45ab-b68e-72bddee9e9ed';

      await expect(() =>
        userController.activeMfa(activeMfaReq)
      ).rejects.toThrow(IncorrectMfaToken.make());
    });
  });

  describe('When Rebus attempt to forget password', () => {
    it('Should create the MFA for reset password', async () => {
      const forgotPasswordReq = new ForgotPasswordReq();
      forgotPasswordReq.email = rebus.email;

      const response = await userController.forgotPassword(forgotPasswordReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When William "Man in Black" attempt to forget password', () => {
    it('Should throw UserNotFound', async () => {
      const forgotPasswordReq = new ForgotPasswordReq();
      forgotPasswordReq.email = william.email;

      await expect(() =>
        userController.forgotPassword(forgotPasswordReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When Craddock attempt to reset password with inactive MFA', () => {
    it('Should throw InactiveMfa', async () => {
      const resetPasswordReq = new ResetPasswordReq();
      resetPasswordReq.email = craddock.email;
      resetPasswordReq.password = craddock.password;
      resetPasswordReq.token = '123456';

      await expect(() =>
        userController.resetPassword(resetPasswordReq)
      ).rejects.toThrow(InactiveMfa.make());
    });
  });

  describe('When William "Man in Black" attempt to reset password', () => {
    it('Should throw UserNotFound', async () => {
      const resetPasswordReq = new ResetPasswordReq();
      resetPasswordReq.email = william.email;
      resetPasswordReq.password = william.password;
      resetPasswordReq.token = '123456';

      await expect(() =>
        userController.resetPassword(resetPasswordReq)
      ).rejects.toThrow(EntityNotFound.make());
    });
  });

  describe('When Sheriff Pickett attempt to reset password with wrong MFA token', () => {
    it('Should throw IncorrectMfaToken', async () => {
      const resetPasswordReq = new ResetPasswordReq();
      resetPasswordReq.email = pickett.email;
      resetPasswordReq.password = pickett.password;
      resetPasswordReq.token = '123456';

      await expect(() =>
        userController.resetPassword(resetPasswordReq)
      ).rejects.toThrow(IncorrectMfaToken.make());
    });
  });

  describe('When Deputy Foss attempt to reset password with correct MFA token', () => {
    it('Should reset password', async () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(true);

      const resetPasswordReq = new ResetPasswordReq();
      resetPasswordReq.email = foss.email;
      resetPasswordReq.password = foss.password;
      resetPasswordReq.token = '123456';

      const response = await userController.resetPassword(resetPasswordReq);

      expect(response.payload).toBeUndefined();
    });
  });

  describe('When Renato attempt to refresh his user', () => {
    it('Should refresh Renato user', async () => {
      const response = await userController.refresh(renato.id);

      expect(response.payload).toEqual(UserRes.make(renatoEntity));
    });
  });

  describe('When Maeve attempt to refresh his user', () => {
    it('Should refresh Maeve user', async () => {
      const response = await userController.refresh(maeve.id);

      expect(response.payload).toEqual(UserRes.make(maeveEntity));
    });
  });
});
