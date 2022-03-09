import {Connection, createConnection} from 'typeorm';

import {cleanAddress} from './clean-database/address';
import {cleanMfa} from './clean-database/mfa';
import {cleanSession} from './clean-database/session';
import {cleanUser} from './clean-database/user';
import {persistAddresses} from './persist-hosts/addresses';
import {persistSessions} from './persist-hosts/sessions';
import {persistUsers} from './persist-hosts/users';

(async () => {
  const connection: Connection = await createConnection();

  await cleanMfa(connection);
  await cleanSession(connection);
  await cleanAddress(connection);
  await cleanUser(connection);

  await persistUsers(connection);
  await persistAddresses(connection);
  await persistSessions(connection);

  process.exit();
})();
