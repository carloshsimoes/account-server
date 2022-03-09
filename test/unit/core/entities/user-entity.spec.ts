import * as bcrypt from 'bcryptjs';

import {UserEntity} from '../../../../src/core/entities/user-entity';
import {AccessLevel} from '../../../../src/core/enums/access-level';
import {IncorrectPassword} from '../../../../src/core/exceptions/user/incorrect-password';
import {maeve, maeveAddresses} from '../../../__hosts__/admins/maeve';
import {brigham} from '../../../__hosts__/customers/brigham';

describe('Given User Entity', () => {
  describe('When attempt to create customer', () => {
    it('Should create customer user', () => {
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      expect(user.getAccessLevel()).toBe(AccessLevel.CUSTOMER);
    });
  });

  describe('When attempt to create admin', () => {
    it('Should create admin user', () => {
      const user = UserEntity.makeAdmin(
        {
          name: maeve.name,
          email: maeve.email,
          password: maeve.password,
          cpf: maeve.cpf,
        },
        {
          street: maeveAddresses[0].street,
          neighborhood: maeveAddresses[0].neighborhood,
          city: maeveAddresses[0].city,
          state: maeveAddresses[0].state,
          zipCode: maeveAddresses[0].zipCode,
          complement: maeveAddresses[0].complement,
        }
      );

      expect(user.getAccessLevel()).toBe(AccessLevel.ADMIN);
    });
  });

  describe('When attempt to set password', () => {
    it('Should set password', () => {
      const generatedPasswordHash = '3bf6889d-f713-4c42-8a8e-d7c6d61a9892';
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(generatedPasswordHash);
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      const result = user.setPassword('MY-NEW-PASSWORD');

      expect(result).toBeUndefined();
    });
  });

  describe('When attempt to validate correct password', () => {
    it('Should validate correct password', () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      const result = user.validatePasswordOrFail('MY-PASSWORD');

      expect(result).toBeUndefined();
    });
  });

  describe('When attempt to validate incorrect password', () => {
    it('Should throw IncorrectPassword', () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      expect(() => user.validatePasswordOrFail('WRONG-PASSWORD')).toThrow(
        IncorrectPassword.make()
      );
    });
  });

  describe('When attempt to get user cpf', () => {
    it('Should get cpf', () => {
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });
      const userCpf = user.getCpf();

      expect(userCpf).toEqual(brigham.cpf);
    });
  });

  describe('When attempt to get user email', () => {
    it('Should get email', () => {
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      const userEmail = user.getEmail();

      expect(userEmail).toEqual(brigham.email);
    });
  });

  describe('When attempt to get user access level', () => {
    it('Should get access level', () => {
      const user = UserEntity.makeCustomer({
        name: brigham.name,
        email: brigham.email,
        password: brigham.password,
        cpf: brigham.cpf,
      });

      const userAccessLevel = user.getAccessLevel();

      expect(userAccessLevel).toEqual(AccessLevel.CUSTOMER);
    });
  });
});
