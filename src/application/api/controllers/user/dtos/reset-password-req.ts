import {IsEmail, IsNotEmpty} from 'class-validator';

export class ResetPasswordReq {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  token!: string;

  @IsNotEmpty()
  password!: string;
}
