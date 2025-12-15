import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsModule } from './modules/leads/leads.module';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),
    LeadsModule,
    PropertiesModule,
  ],
})
export class AppModule {}