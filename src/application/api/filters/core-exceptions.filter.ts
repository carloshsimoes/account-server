import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CoreExceptionsFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const publicMessage = exception.message;

    const responseBody = {
      message: publicMessage,
    };

    const httpStatusCode = exception.getStatus();

    response.status(httpStatusCode).json(responseBody);
  }
}
