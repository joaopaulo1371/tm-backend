import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DataSource } from 'typeorm';
import { seedLeads } from './database/seeds/lead.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  
  // Executar seed de dados
  const dataSource = app.get(DataSource);
  await seedLeads(dataSource);
  
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
