import {AccessLevel} from '../../../src/core/enums/access-level';

const doroty = {
  id: '273ef182-db55-4354-8d6a-3990142acd2f',
  name: 'Doroty X',
  password: '5e967cbe-3294-489a-8929-dc3d7f33903a',
  email: 'doroty.x@mail.com',
  cpf: '000.000.000-20',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '06703b8f-85df-44ef-92ec-aedf96ffaaac',
    active: true,
  },
};

const dorotySessions = [
  {
    userId: doroty.id,
    id: '1b070459-b8bd-4db0-a993-da0c33012316',
    deviceName: 'Doroty device',
  },
];

export {doroty, dorotySessions};
