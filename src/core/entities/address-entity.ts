import {Column, Entity, ManyToOne} from 'typeorm';

import {BaseEntity} from './base-entity';
import {CreateAddressModel} from './dtos/create-address-model';
import {UserEntity} from './user-entity';

@Entity()
export class AddressEntity extends BaseEntity {
  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({nullable: true})
  complement?: string;

  @ManyToOne('UserEntity', 'addresses')
  user: UserEntity;

  static make(createAddressModel: CreateAddressModel): AddressEntity {
    const address = new AddressEntity();
    address.street = createAddressModel.street;
    address.neighborhood = createAddressModel.neighborhood;
    address.city = createAddressModel.city;
    address.state = createAddressModel.state;
    address.zipCode = createAddressModel.zipCode;
    address.complement = createAddressModel.complement;
    return address;
  }

  private constructor() {
    super();
  }
}
