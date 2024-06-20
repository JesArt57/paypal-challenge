import { Module } from '@nestjs/common';
import { MerchantsInfrastructureModule } from '@merchants/infrastructure/merchants-infrastructure.module';
import { MerchantsController } from '@merchants/presenters/rest/merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [MerchantsInfrastructureModule],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService],
})
export class MerchantsModule {}
