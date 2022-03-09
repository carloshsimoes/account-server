import {Inject} from '@nestjs/common';

import {IEnvironment} from '../../environment';
import {IMailConfiguration} from './interfaces/mail-configuration';

export class MailConfiguration implements IMailConfiguration {
  public sendgridApiKey =
    this.processEnvTextService.getValueByKey('SENDGRID_API_KEY');
  public templates = {
    verifyAccount: this.processEnvTextService.getValueByKey(
      'SENDGRID_TEMPLATES_VERIFY_ACCOUNT'
    ),
    forgetPassword: this.processEnvTextService.getValueByKey(
      'SENDGRID_TEMPLATES_FORGET_PASSWORD'
    ),
    loginMfaToken: this.processEnvTextService.getValueByKey(
      'SENDGRID_TEMPLATES_LOGIN_MFA_TOKEN'
    ),
  };
  public sender = {
    email: this.processEnvTextService.getValueByKey('SENDGRID_SENDER_EMAIL'),
  };

  constructor(
    @Inject('IProcessEnvTextService')
    private processEnvTextService: IEnvironment<string>
  ) {}
}
