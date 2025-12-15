import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PropertiesService } from '../services/properties.service';
import {
  CreatePropertyDto,
  UpdatePropertyDto,
  FilterPropertyDto,
  PropertyResponseDto,
} from '../dto';
import { PaginatedResponseDto } from '../../../common/dto/pagination-response.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<PropertyResponseDto> {
    const property = await this.propertiesService.create(createPropertyDto);
    return new PropertyResponseDto(property);
  }

  @Get()
  async findAll(@Query() filterDto: FilterPropertyDto): Promise<PaginatedResponseDto<PropertyResponseDto>> {
    const result = await this.propertiesService.findAll(filterDto);
    const data = result.data.map(property => new PropertyResponseDto(property));
    return new PaginatedResponseDto(data, result.meta);
  }

  @Get('lead/:leadId')
  async findByLead(@Param('leadId') leadId: string): Promise<PropertyResponseDto[]> {
    const properties = await this.propertiesService.findByLead(leadId);
    return properties.map(property => new PropertyResponseDto(property));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PropertyResponseDto> {
    const property = await this.propertiesService.findOne(id);
    return new PropertyResponseDto(property);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyResponseDto> {
    const property = await this.propertiesService.update(id, updatePropertyDto);
    return new PropertyResponseDto(property);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.propertiesService.remove(id);
  }
}