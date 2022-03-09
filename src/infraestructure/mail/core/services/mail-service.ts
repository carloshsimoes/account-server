import {Inject} from '@nestjs/common';
import {MailDataRequired, MailService as SgMailService} from '@sendgrid/mail';

import {IMailService} from '../../../../core/interfaces/services/mail/mail-service';
import {IMailConfiguration} from '../interfaces/mail-configuration';
import {SendMfaToken} from '../models/send-mfa-token';

export class MailService implements IMailService {
  private createMsg(
    sendMfaToken: SendMfaToken,
    templateId: string
  ): MailDataRequired {
    const msg = {
      to: sendMfaToken.recipient.email,
      from: this.mailConfiguration.sender.email,
      templateId,
      dynamicTemplateData: {
        recipientName: sendMfaToken.recipient.name,
        mfaToken: sendMfaToken.mfaToken,
      },
    };

    return msg;
  }

  constructor(
    @Inject('IMailConfiguration') private mailConfiguration: IMailConfiguration,
    @Inject('SgMailService') private sgMailService: SgMailService
  ) {}

  public async sendActiveMfaToken(sendMfaToken: SendMfaToken): Promise<void> {
    const msg = this.createMsg(
      sendMfaToken,
      this.mailConfiguration.templates.verifyAccount
    );

    await this.sgMailService.send(msg);
  }

  public async sendForgetPasswordMfaToken(
    sendMfaToken: SendMfaToken
  ): Promise<void> {
    const msg = this.createMsg(
      sendMfaToken,
      this.mailConfiguration.templates.forgetPassword
    );

    await this.sgMailService.send(msg);
  }

  public async sendLoginMfaToken(sendMfaToken: SendMfaToken): Promise<void> {
    const msg = this.createMsg(
      sendMfaToken,
      this.mailConfiguration.templates.loginMfaToken
    );

    await this.sgMailService.send(msg);
  }
}
