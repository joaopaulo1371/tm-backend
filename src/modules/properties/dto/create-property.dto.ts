import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsUUID,
  Length,
  Min,
} from 'class-validator';
import { CulturaType } from '../entities/property.entity';
import { Trim, ToUpperCase, ToFloat } from '../../../common/transformers';

export class CreatePropertyDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  nome: string;

  @IsEnum(CulturaType)
  cultura: CulturaType;

  @ToFloat()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  areaHectares: number;

  @IsOptional()
  @Trim()
  @IsString()
  @Length(2, 255)
  municipio?: string;

  @IsOptional()
  @ToUpperCase()
  @IsString()
  @Length(2, 2)
  estado?: string;

  @IsOptional()
  @IsString()
  geometria?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsUUID()
  leadId: string;
}