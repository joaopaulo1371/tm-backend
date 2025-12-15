import { DataSource } from 'typeorm';
import { Lead, LeadStatus } from '../../modules/leads/entities/lead.entity';
import { Property, CulturaType } from '../../modules/properties/entities/property.entity';

export async function seedLeads(dataSource: DataSource) {
  const leadRepository = dataSource.getRepository(Lead);
  const propertyRepository = dataSource.getRepository(Property);

  const existingLeads = await leadRepository.count();
  if (existingLeads > 0) {
    console.log('Dados já existem, pulando seed...');
    return;
  }

  const leads = [
    {
      nome: 'João Silva',
      cpf: '12345678901',
      telefone: '(31) 99999-1111',
      email: 'joao@email.com',
      status: LeadStatus.NOVO,
      municipio: 'Uberlândia',
      estado: 'MG',
      comentarios: 'Interessado em fertilizantes para soja'
    },
    {
      nome: 'Maria Santos',
      cpf: '98765432109',
      telefone: '(31) 99999-2222',
      email: 'maria@email.com',
      status: LeadStatus.CONTATO_INICIAL,
      municipio: 'Uberaba',
      estado: 'MG',
      comentarios: 'Produtora de milho e algodão'
    },
    {
      nome: 'Pedro Oliveira',
      cpf: '11122233344',
      telefone: '(31) 99999-3333',
      email: 'pedro@email.com',
      status: LeadStatus.EM_NEGOCIACAO,
      municipio: 'Patos de Minas',
      estado: 'MG',
      comentarios: 'Grande produtor, área > 500 hectares'
    }
  ];

  const savedLeads = await leadRepository.save(leads);

  const properties = [
    {
      nome: 'Fazenda São João',
      cultura: CulturaType.SOJA,
      areaHectares: 150.5,
      municipio: 'Uberlândia',
      estado: 'MG',
      leadId: savedLeads[0].id
    },
    {
      nome: 'Sítio Maria',
      cultura: CulturaType.MILHO,
      areaHectares: 80.0,
      municipio: 'Uberaba',
      estado: 'MG',
      leadId: savedLeads[1].id
    },
    {
      nome: 'Fazenda Esperança',
      cultura: CulturaType.ALGODAO,
      areaHectares: 200.0,
      municipio: 'Uberaba',
      estado: 'MG',
      leadId: savedLeads[1].id
    },
    {
      nome: 'Agropecuária Pedro',
      cultura: CulturaType.SOJA,
      areaHectares: 500.0,
      municipio: 'Patos de Minas',
      estado: 'MG',
      leadId: savedLeads[2].id
    }
  ];

  await propertyRepository.save(properties);

  for (const lead of savedLeads) {
    const leadProperties = await propertyRepository.find({ where: { leadId: lead.id } });
    const totalArea = leadProperties.reduce((sum, prop) => sum + Number(prop.areaHectares), 0);
    lead.prioritario = totalArea > 100;
    await leadRepository.save(lead);
  }

  console.log('Dados de exemplo criados com sucesso!');
}