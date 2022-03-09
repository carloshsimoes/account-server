export class SendMfaToken {
  recipient: {
    email: string;
    name: string;
  };

  mfaToken: string;

  private constructor(
    recipientEmail: string,
    recipientName: string,
    mfaToken: string
  ) {
    this.recipient = {
      email: recipientEmail,
      name: recipientName,
    };

    this.mfaToken = mfaToken;
  }

  public static make(
    recipientEmail: string,
    recipientName: string,
    mfaToken: string
  ): SendMfaToken {
    return new SendMfaToken(recipientEmail, recipientName, mfaToken);
  }
}
