import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {IUserSessionRequest} from './user-session-request';

export const UserSession = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest<IUserSessionRequest>();
    return request.user.userId;
  }
);
