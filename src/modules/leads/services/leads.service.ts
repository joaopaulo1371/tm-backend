import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, LeadStatus } from '../entities/lead.entity';
import { CreateLeadDto, UpdateLeadDto, FilterLeadDto, DashboardResponseDto } from '../dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../../common/dto/pagination-response.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const existingLead = await this.leadRepository.findOne({
      where: { cpf: createLeadDto.cpf },
    });

    if (existingLead) {
      throw new ConflictException('Lead com este CPF já existe');
    }

    const lead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(lead);
  }

  async findAll(filterDto: FilterLeadDto): Promise<PaginatedResponseDto<Lead>> {
    const { page = 1, limit = 10, ...filters } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.leadRepository.createQueryBuilder('lead');

    if (filters.nome) {
      queryBuilder.andWhere('lead.nome ILIKE :nome', { nome: `%${filters.nome}%` });
    }

    if (filters.status) {
      queryBuilder.andWhere('lead.status = :status', { status: filters.status });
    }

    if (filters.municipio) {
      queryBuilder.andWhere('lead.municipio ILIKE :municipio', { municipio: `%${filters.municipio}%` });
    }

    if (filters.estado) {
      queryBuilder.andWhere('lead.estado = :estado', { estado: filters.estado });
    }

    if (filters.prioritario !== undefined) {
      queryBuilder.andWhere('lead.prioritario = :prioritario', { prioritario: filters.prioritario });
    }

    const [leads, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('lead.createdAt', 'DESC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const meta = new PaginationMetaDto({
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });

    return new PaginatedResponseDto(leads, meta);
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['propriedades'],
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOne(id);

    if (updateLeadDto.cpf && updateLeadDto.cpf !== lead.cpf) {
      const existingLead = await this.leadRepository.findOne({
        where: { cpf: updateLeadDto.cpf },
      });

      if (existingLead) {
        throw new ConflictException('Lead com este CPF já existe');
      }
    }

    Object.assign(lead, updateLeadDto);
    
    // Atualiza prioridade baseado na área das propriedades
    await this.updatePrioridade(lead);

    return this.leadRepository.save(lead);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.findOne(id);
    await this.leadRepository.remove(lead);
  }

  async getDashboard(): Promise<DashboardResponseDto> {
    const totalLeads = await this.leadRepository.count();
    const leadsPrioritarios = await this.leadRepository.count({ where: { prioritario: true } });

    const leadsByStatus = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lead.status')
      .getRawMany();

    const leadsByMunicipio = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.municipio', 'municipio')
      .addSelect('COUNT(*)', 'count')
      .where('lead.municipio IS NOT NULL')
      .groupBy('lead.municipio')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return new DashboardResponseDto({
      totalLeads,
      leadsPrioritarios,
      leadsByStatus: leadsByStatus.map(item => ({
        status: item.status,
        count: parseInt(item.count),
      })),
      leadsByMunicipio: leadsByMunicipio.map(item => ({
        municipio: item.municipio,
        count: parseInt(item.count),
      })),
    });
  }

  private async updatePrioridade(lead: Lead): Promise<void> {
    const leadWithProperties = await this.leadRepository.findOne({
      where: { id: lead.id },
      relations: ['propriedades'],
    });

    if (leadWithProperties?.propriedades) {
      const totalArea = leadWithProperties.propriedades.reduce(
        (sum, prop) => sum + Number(prop.areaHectares),
        0,
      );
      lead.prioritario = totalArea > 100;
    }
  }
}