import {SessionEntity} from '../../../../src/core/entities/session-entity';
import {maeveSessions} from '../../../__hosts__/admins/maeve';

describe('Given Session Entity', () => {
  describe('When attempt to create session', () => {
    it('Should create session', () => {
      const session = SessionEntity.make(maeveSessions[0].deviceName);

      expect(session).toBeTruthy();
    });
  });
});
