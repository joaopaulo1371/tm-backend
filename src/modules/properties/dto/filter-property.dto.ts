import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator';
import { CulturaType } from '../entities/property.entity';
import { Trim, ToUpperCase, ToFloat, ToInt } from '../../../common/transformers';

export class FilterPropertyDto {
  @IsOptional()
  @Trim()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEnum(CulturaType)
  cultura?: CulturaType;

  @IsOptional()
  @Trim()
  @IsString()
  municipio?: string;

  @IsOptional()
  @ToUpperCase()
  @IsString()
  estado?: string;

  @IsOptional()
  @ToFloat()
  @IsNumber()
  areaMinima?: number;

  @IsOptional()
  @ToFloat()
  @IsNumber()
  areaMaxima?: number;

  @IsOptional()
  @ToInt()
  page?: number = 1;

  @IsOptional()
  @ToInt()
  limit?: number = 10;
}