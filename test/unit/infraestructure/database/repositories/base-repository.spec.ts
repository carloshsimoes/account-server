import {EntityNotFound} from '../../../../../src/core/exceptions/entity-not-found';
import {BaseRepository} from '../../../../../src/infraestructure/database/repositories/base-repository';

class TestEntity {
  id: string;
}

class TestRepository extends BaseRepository<TestEntity> {}

describe('Given Base Repository', () => {
  const repository = new TestRepository();

  describe('When initialize repository', () => {
    it('Should initalize repository', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('When attempt to find entity or fail', () => {
    it('Should find entity', async () => {
      const entityId = 'c865944d-c63a-4914-bcaa-3f14015533c4';
      const testEntity = new TestEntity();
      testEntity.id = entityId;
      jest.spyOn(repository, 'findOne').mockResolvedValue(testEntity);

      const foundedEntity = await repository.findOneOrFail(entityId);

      expect(testEntity).toEqual(foundedEntity);
    });

    it('Should throw EntityNotFound', async () => {
      const entityId = 'c865944d-c63a-4914-bcaa-3f14015533c4';
      const testEntity = new TestEntity();
      testEntity.id = entityId;
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(() => repository.findOneOrFail(entityId)).rejects.toThrow(
        EntityNotFound.make()
      );
    });
  });
});
