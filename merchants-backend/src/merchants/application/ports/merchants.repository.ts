import { Merchant } from '@merchants/domain/entities/merchant';
import { Pagination } from './features/pagination';

export abstract class MerchantsRepository {
  abstract findAll(pagination: Pagination): Promise<Merchant[]>;
  abstract findOneById(id: string): Promise<Merchant>;
  abstract create(merchant: Merchant): Promise<Merchant>;
  abstract update(id: string, merchant: Merchant): Promise<Merchant>;
  abstract delete(id: string): Promise<Merchant>;
}
