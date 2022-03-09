import {IsEmail} from 'class-validator';

export class ForgotPasswordReq {
  @IsEmail()
  email!: string;
}
