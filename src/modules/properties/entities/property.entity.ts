import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lead } from '../../leads/entities/lead.entity';

export enum CulturaType {
  SOJA = 'soja',
  MILHO = 'milho',
  ALGODAO = 'algodao',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({
    type: 'enum',
    enum: CulturaType,
  })
  cultura: CulturaType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  areaHectares: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  municipio?: string;

  @Column({ type: 'varchar', length: 2, default: 'MG' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  geometria?: string; // GeoJSON ou coordenadas

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @Column({ type: 'uuid' })
  leadId: string;

  @ManyToOne(() => Lead, (lead) => lead.propriedades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}