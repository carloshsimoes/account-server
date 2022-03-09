import {SendMfaToken} from '../../../../infraestructure/mail/core/models/send-mfa-token';

export interface IMailService {
  sendActiveMfaToken(sendMfaToken: SendMfaToken): Promise<void>;
  sendForgetPasswordMfaToken(sendMfaToken: SendMfaToken): Promise<void>;
  sendLoginMfaToken(sendMfaToken: SendMfaToken): Promise<void>;
}
