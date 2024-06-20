import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';
import {
  API_BASEPATH,
  APP_NAME,
} from '@common/infrastructure/constants/app.constants';
import { winstonLogger } from '@common/infrastructure/logger/winston.logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });

  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('APP_PORT', 4000);

  const logger = new Logger('bootstrap');

  app.use(helmet());

  // protección contra inyección de código
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
        },
      },
    }),
  );

  // protección contra clickjanking
  app.use(helmet.frameguard({ action: 'deny' }));

  // protección contra MIME
  app.use(helmet.noSniff());

  // filtro de script entre sitios
  app.use(helmet.xssFilter());

  app.enableCors();

  app.setGlobalPrefix(API_BASEPATH);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  await app.listen(SERVER_PORT);

  logger.log(`app: ${APP_NAME}, running on port: ${SERVER_PORT}`);
}

bootstrap();
