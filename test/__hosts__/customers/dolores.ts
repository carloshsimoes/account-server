import {UserEntity} from '../../../src/core/entities/user-entity';
import {AccessLevel} from '../../../src/core/enums/access-level';

const dolores = {
  id: '09214007-9a9d-4f0d-93df-bb17dab37a91',
  name: 'Dolores Abernathy',
  password: '476cfa7f-1b9a-4885-b792-4bb742294733',
  email: 'dolores.abernathy@mail.com',
  cpf: '000.000.000-01',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '4d39d97e-8182-4bb7-b902-926a5a1f57bf',
    active: true,
  },
};

const doloresEntity = UserEntity.makeCustomer({
  name: dolores.name,
  email: dolores.email,
  password: dolores.password,
  cpf: dolores.cpf,
});
doloresEntity.id = dolores.id;
doloresEntity.mfa['active'] = dolores.mfa.active;

export {dolores, doloresEntity};
