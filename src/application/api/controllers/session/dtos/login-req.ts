import {IsEmail, IsNotEmpty, ValidateIf} from 'class-validator';

export class LoginReq {
  @IsEmail()
  @ValidateIf(req => !req.cpf || req.email)
  email: string | undefined;

  @ValidateIf(req => !req.email || req.cpf)
  cpf: string | undefined;

  @IsNotEmpty()
  password!: string;
}
