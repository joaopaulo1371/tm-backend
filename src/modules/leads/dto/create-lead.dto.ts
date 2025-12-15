import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';
import { LeadStatus } from '../entities/lead.entity';
import { IsCpf } from '../../../common/validators/cpf.validator';
import { NormalizeCpf, Trim, ToUpperCase } from '../../../common/transformers';

export class CreateLeadDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  nome: string;

  @NormalizeCpf()
  @IsCpf()
  cpf: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  comentarios?: string;

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
}