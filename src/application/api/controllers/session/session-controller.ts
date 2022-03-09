import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';

import {ISessionRepository} from '../../../../core/interfaces/repositories/session-repository';
import {IUserRepository} from '../../../../core/interfaces/repositories/user-repository';
import {ISessionService} from '../../../../core/interfaces/services/session/session-service';
import {SessionRepository} from '../../../../infraestructure/database/repositories/session-repository';
import {UserRepository} from '../../../../infraestructure/database/repositories/user-repository';
import {Public} from '../../ingress/jwt/jwt-public.decorator';
import {UserSession} from '../../ingress/user-session/user-session.decorator';
import {IJwtContent} from '../../interfaces/jwt-content';
import {BaseController} from '../base-controller';
import {Envelope} from '../base-response';
import {CreateSessionReq} from './dtos/create-session-req';
import {CreateSessionRes} from './dtos/create-session-res';
import {LoginReq} from './dtos/login-req';
import {SessionRes} from './dtos/session-res';

@Controller('sessions')
export class SessionController extends BaseController {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('ISessionService') private readonly sessionService: ISessionService,
    private readonly jwtService: JwtService,
    @InjectRepository(SessionRepository)
    private readonly sessionRepository: ISessionRepository
  ) {
    super();
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  public async login(@Body() loginReq: LoginReq): Promise<Envelope<undefined>> {
    const {email, cpf, password} = loginReq;

    const user = await this.userRepository.findOneOrFail({
      where: [{email}, {cpf}],
    });

    await this.sessionService.login(user, password);

    return this.envelope(undefined);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createSessionReq: CreateSessionReq
  ): Promise<Envelope<CreateSessionRes>> {
    const {email, cpf, password, token, deviceName} = createSessionReq;

    const user = await this.userRepository.findOneOrFail({
      where: [{email}, {cpf}],
    });

    const session = await this.sessionService.create({
      user,
      password,
      token,
      deviceName,
    });

    const jwtContent: IJwtContent = {
      userId: session.user.id,
      sessionId: session.id,
    };

    const jwtToken = this.jwtService.sign(jwtContent);

    return this.envelope(CreateSessionRes.make(user, jwtToken));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(
    @UserSession() userId: string
  ): Promise<Envelope<SessionRes[]>> {
    const sessions = await this.sessionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return this.envelope(SessionRes.makeList(sessions));
  }
}
