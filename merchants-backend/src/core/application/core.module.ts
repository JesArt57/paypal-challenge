import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TraceMiddleware } from '@core/infraestructure/middlewares/trace.middleware';
import { AppController } from '@core/presenters/rest/app.controller';
import { API_BASEPATH } from '@common/infrastructure/constants/app.constants';

@Module({
  imports: [TerminusModule],
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