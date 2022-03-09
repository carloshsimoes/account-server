import {MailService as SgMailService} from '@sendgrid/mail';

import {IMailConfiguration} from '../interfaces/mail-configuration';

export class SgMailFactory {
  public static make(mailConfiguration: IMailConfiguration): SgMailService {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(mailConfiguration.sendgridApiKey);
    return sgMail;
  }
}
