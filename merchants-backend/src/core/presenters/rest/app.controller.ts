import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(private readonly health: HealthCheckService) { }

  @Get('health')
  @HealthCheck()
  healthcheck() {
    return this.health.check([]);
  }
}
