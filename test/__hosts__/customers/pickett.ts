import {UserEntity} from '../../../src/core/entities/user-entity';
import {AccessLevel} from '../../../src/core/enums/access-level';

const pickett = {
  id: 'b106e62a-e9d6-476f-ab90-88fef28acbdc',
  name: 'Sheriff Pickett',
  password: 'c5ff12d6-56d3-4d3d-991b-777216d81564',
  email: 'pickett@mail.com',
  cpf: '000.000.000-08',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '612cf9c7-694c-4107-b598-b3ce149bbc5a',
    active: true,
  },
};

const pickettEntity = UserEntity.makeCustomer({
  name: pickett.name,
  email: pickett.email,
  password: pickett.password,
  cpf: pickett.cpf,
});
pickettEntity.id = pickett.id;
pickettEntity.mfa['active'] = pickett.mfa.active;

export {pickett, pickettEntity};
