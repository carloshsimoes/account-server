import {CreateDateColumn, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {v4} from 'uuid';

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = v4();
  }
}
