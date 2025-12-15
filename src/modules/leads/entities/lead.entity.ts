import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Property } from '../../properties/entities/property.entity';

export enum LeadStatus {
  NOVO = 'novo',
  CONTATO_INICIAL = 'contato_inicial',
  EM_NEGOCIACAO = 'em_negociacao',
  CONVERTIDO = 'convertido',
  PERDIDO = 'perdido',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NOVO,
  })
  status: LeadStatus;

  @Column({ type: 'text', nullable: true })
  comentarios?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  municipio?: string;

  @Column({ type: 'varchar', length: 2, default: 'MG' })
  estado: string;

  @Column({ type: 'boolean', default: false })
  prioritario: boolean;

  @OneToMany(() => Property, (property) => property.lead, {
    cascade: true,
    eager: false,
  })
  propriedades: Property[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}