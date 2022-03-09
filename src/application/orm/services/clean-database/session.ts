import {Connection, QueryRunner} from 'typeorm';

export const cleanSession = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query('DELETE FROM "session_entity"');
};
