import {SetMetadata} from '@nestjs/common';

import {AccessLevel} from '../../../../core/enums/access-level';

export const ALLOWED_ACCESS_LEVELS = 'ALLOWED_ACCESS_LEVELS';
export const AllowedAccessLevels = (...roles: AccessLevel[]) =>
  SetMetadata(ALLOWED_ACCESS_LEVELS, roles);
