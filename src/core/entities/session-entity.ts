import {Column, Entity, ManyToOne} from 'typeorm';

import {BaseEntity} from './base-entity';
import {UserEntity} from './user-entity';

@Entity()
export class SessionEntity extends BaseEntity {
  @Column()
  deviceName: string;

  @ManyToOne('UserEntity', 'sessions', {eager: true})
  user: UserEntity;

  static make(deviceName: string): SessionEntity {
    const session = new SessionEntity();

    session.deviceName = deviceName;

    return session;
  }

  private constructor() {
    super();
  }
}
