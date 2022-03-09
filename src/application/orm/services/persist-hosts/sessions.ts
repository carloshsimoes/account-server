import {Connection, QueryRunner} from 'typeorm';

import {maeveSessions} from '../../../../../test/__hosts__/admins/maeve';
import {brighamSessions} from '../../../../../test/__hosts__/customers/brigham';
import {dorotySessions} from '../../../../../test/__hosts__/customers/doroty';
import {rebusSessions} from '../../../../../test/__hosts__/customers/rebus';
import {renatoSessions} from '../../../../../test/__hosts__/customers/renato';

export const persistSessions = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  const hostsSessions = [
    ...brighamSessions,
    ...maeveSessions,
    ...rebusSessions,
    ...dorotySessions,
    ...renatoSessions,
  ];

  for (const session of hostsSessions) {
    await queryRunner.query(`
      INSERT INTO public."session_entity" (
        id,
        "createdAt",
        "updatedAt",
        "deviceName",
        "userId"
      ) VALUES (
        '${session.id}', 
        now(), 
        now(), 
        '${session.deviceName}', 
        '${session.userId}'
      );
    `);
  }
};
