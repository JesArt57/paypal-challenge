import { Injectable } from '@nestjs/common';
import { Merchant } from '@merchants/domain/entities/merchant';
import { PaginatedMerchants } from '@merchants/domain/object-values/paginated-merchants';
import { MerchantsRepository } from './ports/merchants.repository';
import { Pagination } from './ports/features/pagination';

@Injectable()
export class MerchantsService {
  constructor(private readonly merchantRepository: MerchantsRepository) { }

  findAll(pagination: Pagination): Promise<PaginatedMerchants> {
    return this.merchantRepository.findAll(pagination);
  }

  findOneById(id: string): Promise<Merchant> {
    return this.merchantRepository.findOneById(id);
  }

  create(merchant: Merchant): Promise<Merchant> {
    return this.merchantRepository.create(merchant);
  }

  update(id: string, merchant: Merchant): Promise<Merchant> {
    return this.merchantRepository.update(id, merchant);
  }

  delete(id: string): Promise<Merchant> {
    return this.merchantRepository.delete(id);
  }

  seed(): Promise<void> {
    return this.merchantRepository.seed();
  }
}
