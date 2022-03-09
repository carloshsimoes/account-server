import {Connection, QueryRunner} from 'typeorm';

export const cleanMfa = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query('DELETE FROM "mfa_entity"');
};
