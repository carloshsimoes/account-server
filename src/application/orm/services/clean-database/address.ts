import {Connection, QueryRunner} from 'typeorm';

export const cleanAddress = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query('DELETE FROM "address_entity"');
};
