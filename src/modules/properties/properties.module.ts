import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertiesController } from './controllers/properties.controller';
import { PropertiesService } from './services/properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}