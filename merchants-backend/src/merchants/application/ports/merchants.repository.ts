import { Merchant } from '@merchants/domain/entities/merchant';
import { PaginatedMerchants } from '@merchants/domain/object-values/paginated-merchants';
import { Pagination } from './features/pagination';

export abstract class MerchantsRepository {
  abstract findAll(pagination: Pagination): Promise<PaginatedMerchants>;
  abstract findOneById(id: string): Promise<Merchant>;
  abstract create(merchant: Merchant): Promise<Merchant>;
  abstract update(id: string, merchant: Merchant): Promise<Merchant>;
  abstract delete(id: string): Promise<Merchant>;
  abstract seed(): Promise<void>;
}
