export interface CreateAddressModel {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}
