import {Test} from '@nestjs/testing';

import {IMailService} from '../../../../../../src/core/interfaces/services/mail/mail-service';
import {mailModule} from '../../../../../../src/infraestructure/mail/core/mail-bootstrap.module';
import {SendMfaToken} from '../../../../../../src/infraestructure/mail/core/models/send-mfa-token';

describe('Given Mail plugin', () => {
  let mailService: IMailService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(mailModule).compile();

    mailService = moduleRef.get<IMailService>('IMailService');
  });

  it('Should send verify account mfa token', async () => {
    const name = '49f9ed46-9223-42ba-986c-314c11450ab0';
    const email = '62f72893-9a3a-4eae-80ac-3b8825e178af@email.webhook.site';
    const token = '123456';

    const sendMfaToken = SendMfaToken.make(email, name, token);

    const response = await mailService.sendActiveMfaToken(sendMfaToken);

    expect(response).toBeUndefined();
  });

  it('Should send forget password mfa token', async () => {
    const name = '49f9ed46-9223-42ba-986c-314c11450ab0';
    const email = '62f72893-9a3a-4eae-80ac-3b8825e178af@email.webhook.site';
    const token = '123456';

    const sendMfaToken = SendMfaToken.make(email, name, token);

    const response = await mailService.sendForgetPasswordMfaToken(sendMfaToken);

    expect(response).toBeUndefined();
  });

  it('Should send login mfa token', async () => {
    const name = '49f9ed46-9223-42ba-986c-314c11450ab0';
    const email = '62f72893-9a3a-4eae-80ac-3b8825e178af@email.webhook.site';
    const token = '123456';

    const sendMfaToken = SendMfaToken.make(email, name, token);

    const response = await mailService.sendLoginMfaToken(sendMfaToken);

    expect(response).toBeUndefined();
  });
});
