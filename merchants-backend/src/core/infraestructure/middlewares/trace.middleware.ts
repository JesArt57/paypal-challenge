import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const traceId: string = uuid();

    const config = {
      traceId,
    };

    // app.locals = propiedades válidas solo durante la vida útil de la solicitud
    req.app.locals.config = config;

    next();
  }
}
