import { Expose, Type } from 'class-transformer';
import { CulturaType } from '../entities/property.entity';

export class PropertyResponseDto {
  @Expose()
  id: string;

  @Expose()
  nome: string;

  @Expose()
  cultura: CulturaType;

  @Expose()
  areaHectares: number;

  @Expose()
  municipio?: string;

  @Expose()
  estado: string;

  @Expose()
  geometria?: string;

  @Expose()
  observacoes?: string;

  @Expose()
  leadId: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  constructor(partial: Partial<PropertyResponseDto>) {
    Object.assign(this, partial);
  }
}