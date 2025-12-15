import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return application status object', () => {
      expect(appController.getHello()).toEqual({
        message: 'TM Digital - CRM Agrícola API',
        version: '1.0.0',
        endpoints: {
          leads: '/api/leads',
          properties: '/api/properties',
          dashboard: '/api/leads/dashboard',
        },
        status: 'running',
      });
    });
  });
});
