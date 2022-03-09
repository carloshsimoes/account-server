import {Connection, QueryRunner} from 'typeorm';

import {maeveAddresses} from '../../../../../test/__hosts__/admins/maeve';
import {phillAddresses} from '../../../../../test/__hosts__/admins/phill';

export const persistAddresses = async (connection: Connection) => {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  const hostAddresses = [...maeveAddresses, ...phillAddresses];

  for (const address of hostAddresses) {
    await queryRunner.query(`
        INSERT INTO public.address_entity (
          id,
          "createdAt",
          "updatedAt",
          street,
          neighborhood,
          city,
          state,
          "zipCode",
          complement,
          "userId"
        ) VALUES (
          '${address.id}',
          now(),
          now(),
          '${address.street}',
          '${address.neighborhood}',
          '${address.city}',
          '${address.state}',
          '${address.zipCode}',
          '${address.complement}',
          '${address.userId}'
        );
      `);
  }
};
