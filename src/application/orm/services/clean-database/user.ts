import {Connection, QueryRunner} from 'typeorm';

export const cleanUser = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query('DELETE FROM "user_entity"');
};
