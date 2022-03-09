import {HttpException, HttpStatus} from '@nestjs/common';

export class EntityNotFound extends HttpException {
  public static readonly MESSAGE = 'EntityNotFound';

  private constructor() {
    super(EntityNotFound.MESSAGE, HttpStatus.NOT_FOUND);
  }

  public static make(): Error {
    return new EntityNotFound();
  }
}
