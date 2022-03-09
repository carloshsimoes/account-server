import {HttpException, HttpStatus} from '@nestjs/common';

export class InactiveMfa extends HttpException {
  public static readonly MESSAGE = 'InactiveMfa';

  private constructor() {
    super(InactiveMfa.MESSAGE, HttpStatus.BAD_REQUEST);
  }

  public static make(): Error {
    return new InactiveMfa();
  }
}
