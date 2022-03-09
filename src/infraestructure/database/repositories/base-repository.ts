import {FindConditions, FindOneOptions, ObjectID, Repository} from 'typeorm';

import {EntityNotFound} from '../../../core/exceptions/entity-not-found';
import {IBaseRepository} from '../../../core/interfaces/repositories/base-repository';

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>
  ): Promise<T>;
  findOneOrFail(options?: FindOneOptions<T>): Promise<T>;
  findOneOrFail(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T>;
  async findOneOrFail(conditions?: never, options?: never): Promise<T> {
    const entity = await this.findOne(conditions, options);

    if (!entity) {
      throw EntityNotFound.make();
    }

    return entity;
  }
}
