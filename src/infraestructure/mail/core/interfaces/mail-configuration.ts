export interface IMailConfiguration {
  sendgridApiKey: string;
  templates: {
    verifyAccount: string;
    forgetPassword: string;
    loginMfaToken: string;
  };
  sender: {
    email: string;
  };
}
