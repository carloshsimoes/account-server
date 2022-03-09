import {HttpException, HttpStatus} from '@nestjs/common';

export class IncorrectMfaToken extends HttpException {
  public static readonly MESSAGE = 'IncorrectMfaToken';

  private constructor() {
    super(IncorrectMfaToken.MESSAGE, HttpStatus.BAD_REQUEST);
  }
  public static make(): Error {
    return new IncorrectMfaToken();
  }
}
