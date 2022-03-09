import {AddressEntity} from '../../../../../core/entities/address-entity';
import {UserEntity} from '../../../../../core/entities/user-entity';
import {AccessLevel} from '../../../../../core/enums/access-level';

class AddressRes {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement: string | undefined;

  private constructor(address: AddressEntity) {
    this.street = address.street;
    this.neighborhood = address.neighborhood;
    this.city = address.city;
    this.state = address.state;
    this.zipCode = address.zipCode;
    this.complement = address.complement;
  }

  static make(address: AddressEntity): AddressRes {
    return new AddressRes(address);
  }
}

export class UserRes {
  id: string;
  name: string;
  email: string;
  mfaActive: boolean;
  accessLevel: AccessLevel;
  addresses: AddressRes[];

  private constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.getEmail();
    this.mfaActive = user.mfa.isActive();
    this.accessLevel = user.getAccessLevel();
    this.addresses = user.addresses.map(address => AddressRes.make(address));
  }

  static make(user: UserEntity): UserRes {
    return new UserRes(user);
  }
}
