import {ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';

import {IS_PUBLIC_KEY} from './jwt-public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  private isPublic(context: ExecutionContext): boolean {
    const publicDecorator = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (publicDecorator) {
      return true;
    }

    return false;
  }

  canActivate(context: ExecutionContext) {
    if (this.isPublic(context)) {
      return true;
    }

    return super.canActivate(context);
  }
}
