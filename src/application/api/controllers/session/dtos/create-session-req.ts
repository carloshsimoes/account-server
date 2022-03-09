import {IsEmail, IsNotEmpty, ValidateIf} from 'class-validator';

export class CreateSessionReq {
  @IsEmail()
  @ValidateIf(req => !req.cpf)
  email: string | undefined;

  @ValidateIf(req => !req.email)
  cpf: string | undefined;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  deviceName!: string;

  @IsNotEmpty()
  token!: string;
}
