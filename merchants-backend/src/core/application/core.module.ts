import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TraceMiddleware } from '@core/infraestructure/middlewares/trace.middleware';
import { AppController } from '@core/presenters/rest/app.controller';
import { APP_BASEPATH } from '@common/infrastructure/constants/app.constants';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceMiddleware)
      .exclude({
        path: `${APP_BASEPATH}/health`,
        method: RequestMethod.GET,
      })
      .forRoutes('');
  }
}