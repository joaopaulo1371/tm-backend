import { IsOptional, IsEnum, IsString, IsBoolean } from 'class-validator';
import { LeadStatus } from '../entities/lead.entity';
import { ToBoolean, ToInt, Trim, ToUpperCase } from '../../../common/transformers';

export class FilterLeadDto {
  @IsOptional()
  @Trim()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @Trim()
  @IsString()
  municipio?: string;

  @IsOptional()
  @ToUpperCase()
  @IsString()
  estado?: string;

  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  prioritario?: boolean;

  @IsOptional()
  @ToInt()
  page?: number = 1;

  @IsOptional()
  @ToInt()
  limit?: number = 10;
}