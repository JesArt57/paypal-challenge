import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Builder } from 'builder-pattern';
import { v4 as uuid } from 'uuid';
import { APIErrorResponse } from '@common/infrastructure/interfaces/api-response.interface';
import { ERROR__RESPONSE_MESSAGE } from '@common/infrastructure/constants/api-messages';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const traceId = request?.app?.locals?.config?.traceId || uuid();

    if (!(exception instanceof HttpException)) {
      const responseBody: APIErrorResponse = Builder<APIErrorResponse>()
        .traceId(traceId)
        .message(ERROR__RESPONSE_MESSAGE)
        .errors(['Error interno en el servidor'])
        .build();

      this.logger.error(
        `Error en ${httpAdapter.getRequestUrl(ctx.getRequest())}: ${exception}`,
        'HttpExceptionsFilter',
        { traceId },
      );

      return httpAdapter.reply(
        response,
        responseBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errors: string[] = [exception.message];
    console.log('exception', exception);
    const exceptionResponse =
      exception instanceof HttpException && exception.getResponse();

    if (Array.isArray(exceptionResponse['message'])) {
      errors = exceptionResponse['message'];
    }

    const responseBody: APIErrorResponse = Builder<APIErrorResponse>()
      .traceId(traceId)
      .message(ERROR__RESPONSE_MESSAGE)
      .errors(errors)
      .build();

    this.logger.error(
      `Error en ${httpAdapter.getRequestUrl(ctx.getRequest())}: ${JSON.stringify(responseBody)}`,
      'HttpExceptionsFilter',
      { traceId },
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
