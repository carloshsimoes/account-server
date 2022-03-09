import {Connection, createConnection} from 'typeorm';

import {cleanAddress} from './clean-database/address';
import {cleanMfa} from './clean-database/mfa';
import {cleanSession} from './clean-database/session';
import {cleanUser} from './clean-database/user';

(async () => {
  const connection: Connection = await createConnection();

  await cleanMfa(connection);
  await cleanAddress(connection);
  await cleanSession(connection);
  await cleanUser(connection);

  process.exit();
})();
