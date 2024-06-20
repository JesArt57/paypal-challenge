export interface Merchant {
  id?: string;
  address: Address;
  email: string;
  logoUrl: string;
  name: string;
  sector: string;
}

export interface Address {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface PaginatedMerchants {
  merchants: Merchant[];
  total: number;
}
