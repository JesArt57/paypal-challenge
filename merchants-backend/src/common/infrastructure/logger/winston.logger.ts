import { format, createLogger, transports } from 'winston';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import { API_BASEPATH } from '@common/infrastructure/constants/app.constants';

interface Logback {
  '@date': string;
  traceId: string;
  level: string;
  appName: string;
  message: string;
  context: string;
}

const operationsFormatter = format.printf((info) => {
  const { message, level, context } = info;

  const traceId: string = context ? context?.traceId || uuid() : uuid();

  const logback: Logback = {
    '@date': dayjs().format('YYYY-MM-DD HH:mm:ss'),
    traceId,
    level: level.toUpperCase(),
    appName: API_BASEPATH,
    message,
    context,
  };

  return JSON.stringify(logback) + '\n';
});

export const winstonLogger = createLogger({
  format: format.combine(operationsFormatter),
  transports: [new transports.Console()],
});
