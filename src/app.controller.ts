import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return {
      message: 'TM Digital - CRM Agrícola API',
      version: '1.0.0',
      endpoints: {
        leads: '/api/leads',
        properties: '/api/properties',
        dashboard: '/api/leads/dashboard'
      },
      status: 'running'
    };
  }
}
