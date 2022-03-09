import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

import {AccessLevel} from '../../../../core/enums/access-level';
import {IUserSessionRequest} from '../user-session/user-session-request';
import {ALLOWED_ACCESS_LEVELS} from './access-level.decorator';
@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedAccessLevels = this.reflector.get<AccessLevel[]>(
      ALLOWED_ACCESS_LEVELS,
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest<IUserSessionRequest>();

    const userAccessLevel = request.user.accessLevel;

    const isUserAllowed = allowedAccessLevels.some(
      level => level === userAccessLevel
    );

    return isUserAllowed;
  }
}
