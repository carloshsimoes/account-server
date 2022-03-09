import {UserEntity} from '../../../src/core/entities/user-entity';
import {AccessLevel} from '../../../src/core/enums/access-level';

const renato = {
  id: '68dcedfa-429b-4b7e-90bd-c0046b80f537',
  name: 'Renato (Froid)',
  password: 'f8c9155d-5acc-4b94-b505-7c9fd2ec92b0',
  email: 'froid@mail.com',
  cpf: '100.000.000-00',
  accessLevel: AccessLevel.CUSTOMER,
  mfa: {
    id: '24978274-ade4-4902-a78a-0a418a78c9a5',
    active: true,
  },
};

const renatoSessions = [
  {
    userId: renato.id,
    id: '88530cbc-af67-4566-96ef-2ad7fb0cded0',
    deviceName: 'Froid device',
  },
];

const renatoEntity = UserEntity.makeCustomer({
  name: renato.name,
  email: renato.email,
  password: renato.password,
  cpf: renato.cpf,
});
renatoEntity.id = renato.id;
renatoEntity.mfa['active'] = renato.mfa.active;

export {renato, renatoEntity, renatoSessions};
