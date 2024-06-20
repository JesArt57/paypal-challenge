import { Module } from '@nestjs/common';
import { OdmPersistenceModule } from './persistence/odm/odm-persistence.module';

@Module({
  imports: [OdmPersistenceModule],
  exports: [OdmPersistenceModule],
})
export class MerchantsInfrastructureModule {}
