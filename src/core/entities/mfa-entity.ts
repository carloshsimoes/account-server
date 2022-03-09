import {authenticator} from 'otplib';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import {InactiveMfa} from '../exceptions/user/inactive-mfa';
import {IncorrectMfaToken} from '../exceptions/user/incorrect-mfa-token';
import {BaseEntity} from './base-entity';
import {UserEntity} from './user-entity';

@Entity()
export class MfaEntity extends BaseEntity {
  static readonly TOKEN_DURATION_SECONDS = 120;

  @Column({unique: true})
  private hash: string;

  @Column()
  private active: boolean;

  @OneToOne('UserEntity', 'mfa')
  @JoinColumn()
  public user: UserEntity;

  static make(): MfaEntity {
    authenticator.options = {step: MfaEntity.TOKEN_DURATION_SECONDS};
    const hash = authenticator.generateSecret();

    const mfa = new MfaEntity();
    mfa.hash = hash;
    mfa.active = false;

    return mfa;
  }

  public generateToken(): string {
    return authenticator.generate(this.hash);
  }

  public validateTokenOrFail(token: string): void {
    if (!this.active) {
      throw InactiveMfa.make();
    }

    const isTokenValid = authenticator.check(token, this.hash);

    if (!isTokenValid) {
      throw IncorrectMfaToken.make();
    }
  }

  public activeMfaOrFail(token: string): void {
    const isMfaTokenValid = authenticator.check(token, this.hash);

    if (!isMfaTokenValid) {
      throw IncorrectMfaToken.make();
    }

    this.active = true;
  }

  public isActive(): boolean {
    return this.active;
  }

  private constructor() {
    super();
  }
}
