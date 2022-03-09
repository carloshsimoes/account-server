import {IsEmail, IsNotEmpty} from 'class-validator';

import {UserEntity} from '../../../../../core/entities/user-entity';

export class CreateAdminReq {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  street: string;

  complement?: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipCode: string;

  public makeUser(): UserEntity {
    return UserEntity.makeAdmin(
      {
        name: this.name,
        email: this.email,
        password: this.password,
        cpf: this.cpf,
      },
      {
        street: this.street,
        neighborhood: this.neighborhood,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        complement: this.complement,
      }
    );
  }
}
