import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantsRepository as MerchantsRepositoryPort } from '@merchants/application/ports/merchants.repository';
import {
  MerchantEntity,
  MerchantEntitySchema,
} from './entities/merchant.entity';
import { AddressEntity, AddressEntitySchema } from './entities/address.entity';
import { MerchantsRepository } from './repositories/merchants.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MerchantEntity.name,
        schema: MerchantEntitySchema,
      },
      {
        name: AddressEntity.name,
        schema: AddressEntitySchema,
      },
    ]),
  ],
  providers: [
    {
      provide: MerchantsRepositoryPort,
      useClass: MerchantsRepository,
    },
  ],
  exports: [MerchantsRepositoryPort],
})
export class OdmPersistenceModule {}
