import {SessionRepository} from '../../../../../src/infraestructure/database/repositories/session-repository';

describe('Given Session Repository', () => {
  const repository = new SessionRepository();

  describe('When initialize repository', () => {
    it('Should initalize repository', () => {
      expect(repository).toBeDefined();
    });
  });
});
