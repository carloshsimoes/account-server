import {IsEmail, IsNotEmpty} from 'class-validator';

import {UserEntity} from '../../../../../core/entities/user-entity';

export class CreateCustomerReq {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  cpf!: string;

  public makeUser(): UserEntity {
    const customerModel = {
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
    };

    const user = UserEntity.makeCustomer(customerModel);

    return user;
  }
}
