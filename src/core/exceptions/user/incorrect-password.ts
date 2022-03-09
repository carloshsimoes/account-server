import {HttpException, HttpStatus} from '@nestjs/common';

export class IncorrectPassword extends HttpException {
  public static readonly MESSAGE = 'IncorrectPassword';

  private constructor() {
    super(IncorrectPassword.name, HttpStatus.BAD_REQUEST);
  }

  public static make(): Error {
    return new IncorrectPassword();
  }
}
