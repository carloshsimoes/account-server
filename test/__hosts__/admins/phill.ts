import {AccessLevel} from '../../../src/core/enums/access-level';

const phill = {
  id: '2891e947-8089-4c3d-81f2-7bce6be04715',
  name: 'Phill',
  password: '871cc545-c0fd-43c8-9c3d-37b2e1dd0c95',
  email: 'phill@mail.com',
  cpf: '000.000.000-16',
  accessLevel: AccessLevel.ADMIN,
  mfa: {
    id: '044c8684-0c90-46b2-a3af-344b054fd221',
    active: true,
  },
};

const phillAddresses = [
  {
    userId: phill.id,

    id: 'e9db5489-6673-4c5c-99b9-c66d8bd48a32',
    street: 'Third Street',
    complement: undefined,
    neighborhood: 'Escalante',
    city: 'West World',
    state: 'Delos',
    zipCode: '00100-101',
  },
];

const phillSessions = [
  {
    userId: phill.id,
    id: 'e21d3b1b-9856-412d-8ae9-feda37dfea77',
    deviceName: 'Phill Device',
  },
];

export {phill, phillAddresses, phillSessions};
