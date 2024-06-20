import { Address } from '@merchants/domain/object-values/address';

export class Merchant {
  id?: string;
  name: string;
  email: string;
  logoUrl: string;
  sector: string;
  address: Address;
}
