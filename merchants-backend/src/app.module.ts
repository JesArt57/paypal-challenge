import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@common/application/common.module';
import { CoreModule } from '@core/application/core.module';
import { MerchantsModule } from '@merchants/application/merchants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    CoreModule,
    MerchantsModule,
  ],
})
export class AppModule {}
