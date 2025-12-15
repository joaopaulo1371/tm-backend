import { Expose } from 'class-transformer';
import { LeadStatus } from '../entities/lead.entity';

export class LeadsByStatusDto {
  @Expose()
  status: LeadStatus;

  @Expose()
  count: number;
}

export class LeadsByMunicipioDto {
  @Expose()
  municipio: string;

  @Expose()
  count: number;
}

export class DashboardResponseDto {
  @Expose()
  totalLeads: number;

  @Expose()
  leadsPrioritarios: number;

  @Expose()
  leadsByStatus: LeadsByStatusDto[];

  @Expose()
  leadsByMunicipio: LeadsByMunicipioDto[];

  constructor(partial: Partial<DashboardResponseDto>) {
    Object.assign(this, partial);
  }
}