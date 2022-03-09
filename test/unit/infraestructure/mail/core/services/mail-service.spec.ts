import {MailService as SgMailService} from '@sendgrid/mail';
import {Mock} from 'moq.ts';

import {IMailConfiguration} from '../../../../../../src/infraestructure/mail/core/interfaces/mail-configuration';
import {SendMfaToken} from '../../../../../../src/infraestructure/mail/core/models/send-mfa-token';
import {MailService} from '../../../../../../src/infraestructure/mail/core/services/mail-service';

describe('Given Sendgrid Service', () => {
  const mailConfiguration: IMailConfiguration = {
    sendgridApiKey: 'a1f953db-6d8b-4475-8f3f-6c7049b7573d',
    templates: {
      verifyAccount: '109a2907-5d29-4666-98a8-01e265cd8417',
      forgetPassword: '82e50046-35fa-4f2d-9462-7636e9b33c96',
      loginMfaToken: '97a22c60-ef81-4d7a-931e-7a9a84406a9c',
    },
    sender: {
      email: '33a275b6-2518-4fd9-bcf4-46b69069c282',
    },
  };

  const sgMailSendSpy = jest.fn();
  const sgMailService = new Mock<SgMailService>()
    .setup(mock => mock.send)
    .returns(sgMailSendSpy)
    .object();

  const service = new MailService(mailConfiguration, sgMailService);

  describe('When attempt to send email', () => {
    it('Should send token mfa for active mfa', async () => {
      sgMailSendSpy.mockResolvedValue(undefined);

      const sendMfaTokenModel: SendMfaToken = {
        recipient: {
          email: '44779a30-d92e-41ea-9167-1e092cba626e',
          name: '8edc6e36-2a66-4bd2-862c-068dad4b0575',
        },
        mfaToken: '3b567dad-b605-48bf-b681-2a021974460a',
      };

      const result = await service.sendActiveMfaToken(sendMfaTokenModel);

      expect(result).toBeUndefined();
    });

    it('Should send mfa token for forget password', async () => {
      sgMailSendSpy.mockResolvedValue(undefined);

      const sendMfaTokenModel: SendMfaToken = {
        recipient: {
          email: '44779a30-d92e-41ea-9167-1e092cba626e',
          name: '8edc6e36-2a66-4bd2-862c-068dad4b0575',
        },
        mfaToken: '3b567dad-b605-48bf-b681-2a021974460a',
      };

      const result = await service.sendForgetPasswordMfaToken(
        sendMfaTokenModel
      );

      expect(result).toBeUndefined();
    });

    it('Should send mfa token for login', async () => {
      sgMailSendSpy.mockResolvedValue(undefined);

      const sendMfaTokenModel: SendMfaToken = {
        recipient: {
          email: '44779a30-d92e-41ea-9167-1e092cba626e',
          name: '8edc6e36-2a66-4bd2-862c-068dad4b0575',
        },
        mfaToken: '3b567dad-b605-48bf-b681-2a021974460a',
      };

      const result = await service.sendLoginMfaToken(sendMfaTokenModel);

      expect(result).toBeUndefined();
    });
  });
});
