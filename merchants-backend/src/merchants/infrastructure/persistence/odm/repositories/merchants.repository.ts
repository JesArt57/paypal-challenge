import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '@merchants/application/ports/features/pagination';
import { MerchantsRepository as MerchantsRepositoryPort } from '@merchants/application/ports/merchants.repository';
import { Merchant } from '@merchants/domain/entities/merchant';
import { MerchantEntity } from '@merchants/infrastructure/persistence/odm/entities/merchant.entity';
import { MerchantsMapper } from '@merchants/infrastructure/persistence/odm/mappers/merchants.mapper';

@Injectable()
export class MerchantsRepository implements MerchantsRepositoryPort {
  constructor(
    @InjectModel(MerchantEntity.name)
    private readonly merchantEntityModel: Model<MerchantEntity>,
  ) {}

  async findAll(pagination: Pagination): Promise<Merchant[]> {
    const merchants = await this.merchantEntityModel
      .find({})
      .limit(pagination.limit)
      .skip(pagination.offset);

    return merchants.map((merchant) => MerchantsMapper.toDomain(merchant));
  }

  async findOneById(id: string): Promise<Merchant> {
    const merchant = await this.merchantEntityModel.findById(id);

    if (!merchant) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    }

    return MerchantsMapper.toDomain(merchant);
  }

  async create(merchant: Merchant): Promise<Merchant> {
    const merchantToCreate = MerchantsMapper.toPersistence(merchant);

    const merchantEntity = new this.merchantEntityModel(merchantToCreate);

    const createdMerchant = await merchantEntity.save();

    return MerchantsMapper.toDomain(createdMerchant);
  }

  async update(id: string, merchant: Merchant): Promise<Merchant> {
    const merchantToUpdate = MerchantsMapper.toPersistence(merchant);

    const updatedMerchant = await this.merchantEntityModel.findByIdAndUpdate(
      id,
      merchantToUpdate,
      { new: true },
    );

    if (!updatedMerchant) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    }

    return MerchantsMapper.toDomain(updatedMerchant);
  }

  async delete(id: string): Promise<Merchant> {
    const deletedMerchant = await this.merchantEntityModel.findByIdAndDelete(
      id,
      { new: true },
    );

    if (!deletedMerchant) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    }

    return MerchantsMapper.toDomain(deletedMerchant);
  }
}
