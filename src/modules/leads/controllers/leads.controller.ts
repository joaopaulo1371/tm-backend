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
import { LeadsService } from '../services/leads.service';
import {
  CreateLeadDto,
  UpdateLeadDto,
  FilterLeadDto,
  LeadResponseDto,
  DashboardResponseDto,
} from '../dto';
import { PaginatedResponseDto } from '../../../common/dto/pagination-response.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLeadDto: CreateLeadDto): Promise<LeadResponseDto> {
    const lead = await this.leadsService.create(createLeadDto);
    return new LeadResponseDto(lead);
  }

  @Get()
  async findAll(@Query() filterDto: FilterLeadDto): Promise<PaginatedResponseDto<LeadResponseDto>> {
    const result = await this.leadsService.findAll(filterDto);
    const data = result.data.map(lead => new LeadResponseDto(lead));
    return new PaginatedResponseDto(data, result.meta);
  }

  @Get('dashboard')
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.leadsService.getDashboard();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeadResponseDto> {
    const lead = await this.leadsService.findOne(id);
    return new LeadResponseDto(lead);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    const lead = await this.leadsService.update(id, updateLeadDto);
    return new LeadResponseDto(lead);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.leadsService.remove(id);
  }
}