import {AccessLevel} from '../../../src/core/enums/access-level';

const brigham = {
  id: '5effd39b-7190-403c-837f-551f0aa01d83',
  name: 'Colonel Brigham',
  password: '70873f58-aa85-4c36-a66f-60083336a32b',
  email: 'brigham@mail.com',
  cpf: '000.000.000-11',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '09cf6df1-4bba-406e-ab9b-f4473012e3d4',
    active: true,
  },
};

const brighamSessions = [
  {
    userId: brigham.id,
    id: '8a39b734-c25f-4488-ab6e-7d3c738ceae1',
    deviceName: 'Colonel Brigham Device',
  },
];

export {brigham, brighamSessions};
