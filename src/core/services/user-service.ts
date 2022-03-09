import {Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {UserRepository} from '../../infraestructure/database/repositories/user-repository';
import {SendMfaToken} from '../../infraestructure/mail/core/models/send-mfa-token';
import {UserEntity} from '../entities/user-entity';
import {UserAlreadyExists} from '../exceptions/user/user-already-exists';
import {IUserRepository} from '../interfaces/repositories/user-repository';
import {IMailService} from '../interfaces/services/mail/mail-service';
import {IUserService} from '../interfaces/services/user/user-service';

export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('IMailService') private readonly mailService: IMailService
  ) {}

  public async create(user: UserEntity): Promise<void> {
    const foundedUser = await this.userRepository.findOne({
      where: [{email: user.getEmail()}, {cpf: user.getCpf()}],
    });

    if (foundedUser) {
      throw UserAlreadyExists.make();
    }

    const createdUser = await this.userRepository.save(user);

    const mfaToken = createdUser.mfa.generateToken();

    const sendMfaToken = SendMfaToken.make(
      createdUser.getEmail(),
      createdUser.name,
      mfaToken
    );

    await this.mailService.sendActiveMfaToken(sendMfaToken);
  }

  public async activeMfa(email: string, token: string): Promise<void> {
    const foundedUser = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });

    foundedUser.mfa.activeMfaOrFail(token);

    await this.userRepository.save(foundedUser);
  }

  public async forgotPassword(email: string): Promise<void> {
    const foundedUser = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });

    const mfaToken = foundedUser.mfa.generateToken();

    const sendMfaToken = SendMfaToken.make(
      foundedUser.getEmail(),
      foundedUser.name,
      mfaToken
    );

    await this.mailService.sendForgetPasswordMfaToken(sendMfaToken);
  }

  public async resetPassword(
    email: string,
    token: string,
    password: string
  ): Promise<void> {
    const foundedUser = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });

    foundedUser.mfa.validateTokenOrFail(token);

    foundedUser.setPassword(password);

    await this.userRepository.save(foundedUser);
  }
}
