import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto, UpdatePropertyDto, FilterPropertyDto } from '../dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../../common/dto/pagination-response.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  async findAll(filterDto: FilterPropertyDto): Promise<PaginatedResponseDto<Property>> {
    const { page = 1, limit = 10, ...filters } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.propertyRepository.createQueryBuilder('property');

    if (filters.nome) {
      queryBuilder.andWhere('property.nome ILIKE :nome', { nome: `%${filters.nome}%` });
    }

    if (filters.cultura) {
      queryBuilder.andWhere('property.cultura = :cultura', { cultura: filters.cultura });
    }

    if (filters.municipio) {
      queryBuilder.andWhere('property.municipio ILIKE :municipio', { municipio: `%${filters.municipio}%` });
    }

    if (filters.estado) {
      queryBuilder.andWhere('property.estado = :estado', { estado: filters.estado });
    }

    if (filters.areaMinima) {
      queryBuilder.andWhere('property.areaHectares >= :areaMinima', { areaMinima: filters.areaMinima });
    }

    if (filters.areaMaxima) {
      queryBuilder.andWhere('property.areaHectares <= :areaMaxima', { areaMaxima: filters.areaMaxima });
    }

    const [properties, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('property.createdAt', 'DESC')
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

    return new PaginatedResponseDto(properties, meta);
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['lead'],
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);
    Object.assign(property, updatePropertyDto);
    return this.propertyRepository.save(property);
  }

  async remove(id: string): Promise<void> {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
  }

  async findByLead(leadId: string): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { leadId },
      order: { createdAt: 'DESC' },
    });
  }
}