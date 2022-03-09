import {UserRepository} from '../../../../../src/infraestructure/database/repositories/user-repository';

describe('Given User Repository', () => {
  const repository = new UserRepository();

  describe('When initialize repository', () => {
    it('Should initalize repository', () => {
      expect(repository).toBeDefined();
    });
  });
});
