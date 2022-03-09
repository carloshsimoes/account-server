import {Repository} from 'typeorm';

export type IBaseRepository<T> = Repository<T>;
