import {IsEmail, IsNotEmpty} from 'class-validator';

export class ActiveMfaReq {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  token: string;
}
