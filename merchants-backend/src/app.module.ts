import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@common/application/common.module';
import { CoreModule } from '@core/application/core.module';
import { MerchantsModule } from '@merchants/application/merchants.module';
import { AllExceptionsFilter } from '@common/presenters/exceptions/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    CoreModule,
    MerchantsModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
