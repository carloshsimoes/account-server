import {HttpException, HttpStatus} from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  public static readonly MESSAGE = 'UserAlreadyExists';

  private constructor() {
    super(UserAlreadyExists.MESSAGE, HttpStatus.BAD_REQUEST);
  }

  public static make(): Error {
    return new UserAlreadyExists();
  }
}
