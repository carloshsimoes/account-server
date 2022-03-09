import {compareSync, genSaltSync, hashSync} from 'bcryptjs';
import {Column, Entity, OneToMany, OneToOne} from 'typeorm';

import {AccessLevel} from '../enums/access-level';
import {IncorrectPassword} from '../exceptions/user/incorrect-password';
import {AddressEntity} from './address-entity';
import {BaseEntity} from './base-entity';
import {CreateAddressModel} from './dtos/create-address-model';
import {CreateUserModel} from './dtos/create-user-model';
import {MfaEntity} from './mfa-entity';
import {SessionEntity} from './session-entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({unique: true})
  private cpf: string;

  public getCpf(): string {
    return this.cpf;
  }

  @Column({unique: true})
  private email: string;

  public getEmail(): string {
    return this.email;
  }

  @Column()
  private password: string;

  private generatePasswordHash(password: string): string {
    const salt = genSaltSync(10);
    const hashOfPassword = hashSync(password, salt);
    return hashOfPassword;
  }

  public setPassword(password: string): void {
    this.password = this.generatePasswordHash(password);
  }

  public validatePasswordOrFail(password: string): void {
    const isPasswordValid = compareSync(password, this.password);

    if (!isPasswordValid) {
      throw IncorrectPassword.make();
    }
  }

  @Column({
    type: 'enum',
    enum: AccessLevel,
  })
  private accessLevel: AccessLevel;

  public getAccessLevel(): AccessLevel {
    return this.accessLevel;
  }

  @OneToMany('AddressEntity', 'user', {eager: true})
  public addresses: AddressEntity[];

  @OneToOne('MfaEntity', 'user', {eager: true})
  public mfa: MfaEntity;

  @OneToMany('SessionEntity', 'user')
  public sessions: SessionEntity[];

  private static make(
    createUserModel: CreateUserModel,
    accessLevel: AccessLevel,
    addresses: CreateAddressModel[]
  ): UserEntity {
    const user = new UserEntity();
    user.name = createUserModel.name;
    user.email = createUserModel.email;
    user.setPassword(createUserModel.password);
    user.cpf = createUserModel.cpf;
    user.accessLevel = accessLevel;
    user.mfa = MfaEntity.make();
    user.addresses = addresses.map(address => AddressEntity.make(address));
    user.sessions = [];
    return user;
  }

  static makeAdmin(
    createUserModel: CreateUserModel,
    createAddressModel: CreateAddressModel
  ): UserEntity {
    return this.make(createUserModel, AccessLevel.ADMIN, [createAddressModel]);
  }

  static makeCustomer(createUserModel: CreateUserModel): UserEntity {
    return this.make(createUserModel, AccessLevel.CUSTOMER, []);
  }

  private constructor() {
    super();
  }
}
