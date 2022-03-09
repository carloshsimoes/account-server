import {authenticator} from 'otplib';

import {MfaEntity} from '../../../../src/core/entities/mfa-entity';
import {InactiveMfa} from '../../../../src/core/exceptions/user/inactive-mfa';
import {IncorrectMfaToken} from '../../../../src/core/exceptions/user/incorrect-mfa-token';

describe('Given MFA entity', () => {
  describe('When attempt to generate token', () => {
    it('Should generate valid token', () => {
      const expectedToken = '123456';
      jest.spyOn(authenticator, 'generate').mockReturnValue(expectedToken);
      const mfa = MfaEntity.make();

      const generatedToken = mfa.generateToken();

      expect(generatedToken).toBe(expectedToken);
    });
  });

  describe('When attempt to validate token with inactive MFA', () => {
    it('Should throw InactiveMfa', () => {
      let mfa = MfaEntity.make();
      mfa = Object.assign(mfa, {active: false});

      expect(() => mfa.validateTokenOrFail('123456')).toThrow(
        InactiveMfa.make()
      );
    });
  });

  describe('When attempt to active MFA with invalid token', () => {
    it('Should throw IncorrectMfaToken', () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(false);
      const mfa = MfaEntity.make();

      expect(() => mfa.activeMfaOrFail('123456')).toThrow(
        IncorrectMfaToken.make()
      );
    });
  });

  describe('When attempt to active MFA with valid token', () => {
    it('Should active the MFA', () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(true);
      const mfa = MfaEntity.make();

      const result = mfa.activeMfaOrFail('123456');

      expect(result).toBeUndefined();
    });
  });

  describe('When attempt to validate token with active MFA', () => {
    it('Should validate generated token', () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(true);
      let mfa = MfaEntity.make();
      mfa = Object.assign(mfa, {active: true});

      const result = mfa.validateTokenOrFail('123456');

      expect(result).toBeUndefined();
    });
  });

  describe('When attempt to validate invalid generated token', () => {
    it('Should throw IncorrectMfaToken', () => {
      jest.spyOn(authenticator, 'check').mockReturnValue(false);
      let mfa = MfaEntity.make();
      mfa = Object.assign(mfa, {active: true});

      expect(() => mfa.validateTokenOrFail('123456')).toThrow(
        IncorrectMfaToken.make()
      );
    });
  });

  describe('When attempt to check active status', () => {
    it('Should check active mfa', () => {
      let mfa = MfaEntity.make();
      mfa = Object.assign(mfa, {active: true});

      const result = mfa.isActive();

      expect(result).toBeTruthy();
    });
  });
});
