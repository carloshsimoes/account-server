import {AddressEntity} from '../../../../src/core/entities/address-entity';
import {maeveAddresses} from '../../../__hosts__/admins/maeve';
import {phillAddresses} from '../../../__hosts__/admins/phill';

describe('Given Address Entity', () => {
  describe('When attempt to create address with complement', () => {
    it('Should create address with complement', () => {
      const address = AddressEntity.make({
        street: maeveAddresses[0].street,
        neighborhood: maeveAddresses[0].neighborhood,
        city: maeveAddresses[0].city,
        state: maeveAddresses[0].state,
        zipCode: maeveAddresses[0].zipCode,
        complement: maeveAddresses[0].complement,
      });

      expect(address).toBeTruthy();
    });
  });

  describe('When attempt to create address without complement', () => {
    it('Should create address without complement', () => {
      const address = AddressEntity.make({
        street: phillAddresses[0].street,
        neighborhood: phillAddresses[0].neighborhood,
        city: phillAddresses[0].city,
        state: phillAddresses[0].state,
        zipCode: phillAddresses[0].zipCode,
        complement: phillAddresses[0].complement,
      });

      expect(address).toBeTruthy();
    });
  });
});
