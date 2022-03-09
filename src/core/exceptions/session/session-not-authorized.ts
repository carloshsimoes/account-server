import {HttpException, HttpStatus} from '@nestjs/common';

export class SessionNotAuthorized extends HttpException {
  public static readonly MESSAGE = 'SessionNotAuthorized';

  private constructor() {
    super(SessionNotAuthorized.MESSAGE, HttpStatus.UNAUTHORIZED);
  }

  public static make(): Error {
    return new SessionNotAuthorized();
  }
}
