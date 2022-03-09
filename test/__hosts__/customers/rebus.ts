import {AccessLevel} from '../../../src/core/enums/access-level';

const rebus = {
  id: '15a50970-93e4-45ef-b532-e78a0cc4ed30',
  name: 'Rebus',
  password: '46a36d5d-0932-4b4b-a24a-1dad833ede37',
  email: 'rebus@mail.com',
  cpf: '000.000.000-06',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '3bd24be9-486d-4b00-8ee3-3025de7395a8',
    active: true,
  },
};

const rebusSessions = [
  {
    userId: rebus.id,
    id: '291dec48-b73d-403e-ac58-a5b2769684ad',
    deviceName: 'Rebus device',
  },
];

export {rebus, rebusSessions};
