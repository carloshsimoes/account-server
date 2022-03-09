import {Test} from '@nestjs/testing';

import {apiModule} from '../../../../src/application/api/api-bootstrap.module';
import {SessionNotAuthorized} from '../../../../src/core/exceptions/session/session-not-authorized';
import {ISessionService} from '../../../../src/core/interfaces/services/session/session-service';
import {brigham, brighamSessions} from '../../../__hosts__/customers/brigham';
import {norris} from '../../../__hosts__/customers/norris';
import {william} from '../../../__hosts__/guests/william';

describe('Given Session Service', () => {
  let sessionService: ISessionService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    sessionService = moduleRef.get<ISessionService>('ISessionService');
  });

  describe('When William "Man in Black" attempt to find his session', () => {
    it('Should throw EntityNotFound', async () => {
      const userId = william.id;
      const sessionId = 'bcdba1e9-76af-4b69-b642-9d9b5053cd68';

      await expect(() =>
        sessionService.findCurrentSessionOrFail(userId, sessionId)
      ).rejects.toThrow(SessionNotAuthorized.make());
    });
  });

  describe('When Captain Norris attempt to find his session without login', () => {
    it('Should throw SessionNotFound', async () => {
      const userId = norris.id;
      const sessionId = 'bcdba1e9-76af-4b69-b642-9d9b5053cd68';

      await expect(() =>
        sessionService.findCurrentSessionOrFail(userId, sessionId)
      ).rejects.toThrow(SessionNotAuthorized.make());
    });
  });

  describe('When Colonel Brigham attempt to find his session', () => {
    it('Should find Colonel Brigham', async () => {
      const userId = brighamSessions[0].userId;
      const sessionId = brighamSessions[0].id;

      const session = await sessionService.findCurrentSessionOrFail(
        userId,
        sessionId
      );

      expect(session.user.getAccessLevel()).toEqual(brigham.accessLevel);
    });
  });
});
