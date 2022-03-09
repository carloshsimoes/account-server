import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {AccessLevel} from '../../../../core/enums/access-level';
import {IUserRepository} from '../../../../core/interfaces/repositories/user-repository';
import {IUserService} from '../../../../core/interfaces/services/user/user-service';
import {UserRepository} from '../../../../infraestructure/database/repositories/user-repository';
import {AllowedAccessLevels} from '../../ingress/access-level/access-level.decorator';
import {AccessLevelGuard} from '../../ingress/access-level/access-level.guard';
import {Public} from '../../ingress/jwt/jwt-public.decorator';
import {UserSession} from '../../ingress/user-session/user-session.decorator';
import {BaseController} from '../base-controller';
import {Envelope} from '../base-response';
import {CreateAdminReq} from './dtos/create-admin-req';
import {CreateCustomerReq} from './dtos/create-customer-req';
import {ForgotPasswordReq} from './dtos/forgot-password-req';
import {ActiveMfaReq} from './dtos/mfa-active-req';
import {ResetPasswordReq} from './dtos/reset-password-req';
import {UserRes} from './dtos/user-res';

@Controller('users')
export class UserController extends BaseController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  @UseGuards(AccessLevelGuard)
  @AllowedAccessLevels(AccessLevel.ADMIN)
  @Post('/admin')
  @HttpCode(HttpStatus.CREATED)
  public async createAdmin(
    @Body() createAdminReq: CreateAdminReq
  ): Promise<Envelope<undefined>> {
    const user = createAdminReq.makeUser();

    await this.userService.create(user);

    return this.envelope(undefined);
  }

  @Public()
  @Post('/customer')
  @HttpCode(HttpStatus.CREATED)
  public async createCustomer(
    @Body() createCustomerReq: CreateCustomerReq
  ): Promise<Envelope<undefined>> {
    const user = createCustomerReq.makeUser();

    await this.userService.create(user);

    return this.envelope(undefined);
  }

  @Public()
  @Patch('/mfa/active')
  @HttpCode(HttpStatus.OK)
  public async activeMfa(
    @Body() activeMfaReq: ActiveMfaReq
  ): Promise<Envelope<undefined>> {
    const {email, token} = activeMfaReq;

    await this.userService.activeMfa(email, token);

    return this.envelope(undefined);
  }

  @Public()
  @Post('/password/forgot')
  @HttpCode(HttpStatus.CREATED)
  public async forgotPassword(
    @Body() forgotPasswordReq: ForgotPasswordReq
  ): Promise<Envelope<undefined>> {
    const {email} = forgotPasswordReq;

    await this.userService.forgotPassword(email);

    return this.envelope(undefined);
  }

  @Public()
  @Patch('/password/reset')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Body() resetPasswordReq: ResetPasswordReq
  ): Promise<Envelope<undefined>> {
    const {email, token, password} = resetPasswordReq;

    await this.userService.resetPassword(email, token, password);

    return this.envelope(undefined);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @UserSession() userId: string
  ): Promise<Envelope<UserRes>> {
    const foundedUser = await this.userRepository.findOneOrFail(userId);

    return this.envelope(UserRes.make(foundedUser));
  }
}
