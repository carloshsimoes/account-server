import {Connection, QueryRunner} from 'typeorm';
import {v4} from 'uuid';

import {maeve} from '../../../../../test/__hosts__/admins/maeve';
import {phill} from '../../../../../test/__hosts__/admins/phill';
import {brigham} from '../../../../../test/__hosts__/customers/brigham';
import {clementine} from '../../../../../test/__hosts__/customers/clementine';
import {craddock} from '../../../../../test/__hosts__/customers/craddock';
import {dolores} from '../../../../../test/__hosts__/customers/dolores';
import {doroty} from '../../../../../test/__hosts__/customers/doroty';
import {foss} from '../../../../../test/__hosts__/customers/foss';
import {lawrence} from '../../../../../test/__hosts__/customers/lawrence';
import {norris} from '../../../../../test/__hosts__/customers/norris';
import {pickett} from '../../../../../test/__hosts__/customers/pickett';
import {rebus} from '../../../../../test/__hosts__/customers/rebus';
import {renato} from '../../../../../test/__hosts__/customers/renato';
import {roe} from '../../../../../test/__hosts__/customers/roe';

export const persistUsers = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  const hosts = [
    maeve,
    phill,
    brigham,
    clementine,
    craddock,
    dolores,
    foss,
    lawrence,
    norris,
    pickett,
    rebus,
    roe,
    doroty,
    renato,
  ];

  for (const host of hosts) {
    await queryRunner.query(`
      INSERT INTO public."user_entity" (
        id, 
        "createdAt", 
        "updatedAt", 
        cpf, 
        email, 
        "password", 
        "accessLevel", 
        "name"
      ) VALUES (
        '${host.id}',
        now(),
        now(),
        '${host.cpf}',
        '${host.email}',
        '${host.password}',
        '${host.accessLevel}',
        '${host.name}'
      );
    `);

    await queryRunner.query(`
      INSERT INTO public."mfa_entity" (
        id, 
        "createdAt", 
        "updatedAt", 
        hash, 
        active, 
        "userId"
      ) VALUES (
        '${host.mfa.id}', 
        now(), 
        now(), 
        '${v4()}', 
        ${host.mfa.active}, 
        '${host.id}'
      );
    `);
  }
};
