import { Exclude, Expose, Type } from 'class-transformer';
import { LeadStatus } from '../entities/lead.entity';

export class LeadResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  cpf: string;

  @Expose()
  telefone?: string;

  @Expose()
  email?: string;

  @Expose()
  status: LeadStatus;

  @Expose()
  comentarios?: string;

  @Expose()
  municipio?: string;

  @Expose()
  estado: string;

  @Expose()
  prioritario: boolean;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  constructor(partial: Partial<LeadResponseDto>) {
    Object.assign(this, partial);
  }
}