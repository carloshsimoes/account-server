// Each test send an e-mail, which debit in account quota.
// Also, Sendgrid has tigth policy to use e-mail service.
// So, we need to mock the module.
jest.mock('@sendgrid/mail');
