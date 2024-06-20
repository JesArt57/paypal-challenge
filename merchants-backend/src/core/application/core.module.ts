import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TraceMiddleware } from '@core/infraestructure/middlewares/trace.middleware';
import { AppController } from '@core/presenters/rest/app.controller';
import { API_BASEPATH } from '@common/infrastructure/constants/app.constants';

@Module({
  imports: [
    TerminusModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_PAYPAL_CONNECTION_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceMiddleware)
      .exclude({
        path: `${API_BASEPATH}/health`,
        method: RequestMethod.GET,
      })
      .forRoutes('');
  }
}
