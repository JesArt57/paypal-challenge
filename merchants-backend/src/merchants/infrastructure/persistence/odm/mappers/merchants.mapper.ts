import { Merchant } from '@merchants/domain/entities/merchant';
import { MerchantEntity } from '@merchants/infrastructure/persistence/odm/entities/merchant.entity';
import { Builder } from 'builder-pattern';

export class MerchantsMapper {
  static toDomain(merchantEntity: MerchantEntity): Merchant {
    return Builder<Merchant>()
      .id(merchantEntity._id.toString())
      .address(merchantEntity.address)
      .email(merchantEntity.email)
      .logoUrl(merchantEntity.logoUrl)
      .name(merchantEntity.name)
      .sector(merchantEntity.sector)
      .build();
  }

  static toPersistence(merchant: Merchant): MerchantEntity {
    return Builder<MerchantEntity>()
      .address(merchant.address)
      .email(merchant.email)
      .logoUrl(merchant.logoUrl)
      .name(merchant.name)
      .sector(merchant.sector)
      .build();
  }
}
