import {SessionEntity} from '../../../src/core/entities/session-entity';
import {UserEntity} from '../../../src/core/entities/user-entity';
import {AccessLevel} from '../../../src/core/enums/access-level';

const maeve = {
  id: 'eeeda723-9524-4972-af74-aeb784f70de4',
  name: 'Maeve Millay',
  password: '4db278dc-18fa-41e2-a5fe-c353a063b9ce',
  email: 'maeve.millay@mail.com',
  cpf: '000.000.000-03',
  accessLevel: AccessLevel.ADMIN,
  mfa: {
    id: '8b87ad47-6793-4eca-aa92-1939548b4ad5',
    active: true,
  },
};

const maeveAddresses = [
  {
    userId: maeve.id,
    id: 'fb26ae7e-bc0e-4367-a7a8-431610b38b56',
    street: 'First Street',
    complement: 'Apt. 1',
    neighborhood: 'Sweetwater',
    city: 'West World',
    state: 'Delos',
    zipCode: '00000-001',
  },
];

const maeveSessions = [
  {
    userId: maeve.id,
    id: '1105fa92-752f-4360-b754-8519f6cd6c2c',
    deviceName: 'Maeve Millay Device',
  },
];

const maeveEntity = UserEntity.makeAdmin(
  {
    name: maeve.name,
    email: maeve.email,
    password: maeve.password,
    cpf: maeve.cpf,
  },
  {
    street: maeveAddresses[0].street,
    complement: maeveAddresses[0].complement,
    neighborhood: maeveAddresses[0].neighborhood,
    city: maeveAddresses[0].city,
    state: maeveAddresses[0].state,
    zipCode: maeveAddresses[0].zipCode,
  }
);
maeveEntity.id = maeve.id;
maeveEntity.mfa['active'] = maeve.mfa.active;

const maeveSessionEntity = SessionEntity.make(maeveSessions[0].deviceName);
maeveSessionEntity.id = maeveSessions[0].id;
maeveSessionEntity.user = maeveEntity;

export {maeve, maeveAddresses, maeveEntity, maeveSessionEntity, maeveSessions};
