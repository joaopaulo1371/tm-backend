const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456', // Substitua pela sua senha
  database: 'tm_crm'
});

async function populateDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado ao banco tm_crm');

    // Inserir leads
    const leadsQuery = `
      INSERT INTO leads (id, nome, cpf, telefone, email, status, municipio, estado, comentarios, prioritario, "createdAt", "updatedAt") 
      VALUES 
        (gen_random_uuid(), 'João Silva', '12345678901', '(31) 99999-1111', 'joao@email.com', 'novo', 'Uberlândia', 'MG', 'Interessado em fertilizantes para soja', false, NOW(), NOW()),
        (gen_random_uuid(), 'Maria Santos', '98765432109', '(31) 99999-2222', 'maria@email.com', 'contato_inicial', 'Uberaba', 'MG', 'Produtora de milho e algodão', true, NOW(), NOW()),
        (gen_random_uuid(), 'Pedro Oliveira', '11122233344', '(31) 99999-3333', 'pedro@email.com', 'em_negociacao', 'Patos de Minas', 'MG', 'Grande produtor, área > 500 hectares', true, NOW(), NOW())
      ON CONFLICT DO NOTHING;
    `;

    await client.query(leadsQuery);
    console.log('✅ Leads inseridos');

    // Buscar IDs dos leads para as propriedades
    const leadsResult = await client.query('SELECT id, nome FROM leads ORDER BY nome');
    const leads = leadsResult.rows;

    if (leads.length >= 3) {
      // Inserir propriedades
      const propertiesQuery = `
        INSERT INTO properties (id, nome, cultura, "areaHectares", municipio, estado, "leadId", "createdAt", "updatedAt")
        VALUES 
          (gen_random_uuid(), 'Fazenda São João', 'soja', 150.5, 'Uberlândia', 'MG', $1, NOW(), NOW()),
          (gen_random_uuid(), 'Sítio Maria', 'milho', 80.0, 'Uberaba', 'MG', $2, NOW(), NOW()),
          (gen_random_uuid(), 'Fazenda Esperança', 'algodao', 200.0, 'Uberaba', 'MG', $2, NOW(), NOW()),
          (gen_random_uuid(), 'Agropecuária Pedro', 'soja', 500.0, 'Patos de Minas', 'MG', $3, NOW(), NOW())
        ON CONFLICT DO NOTHING;
      `;

      await client.query(propertiesQuery, [leads[0].id, leads[1].id, leads[2].id]);
      console.log('✅ Propriedades inseridas');

      // Atualizar prioridade dos leads baseado na área
      const updatePriorityQuery = `
        UPDATE leads 
        SET prioritario = (
          SELECT COALESCE(SUM("areaHectares"), 0) > 100 
          FROM properties 
          WHERE properties."leadId" = leads.id
        );
      `;

      await client.query(updatePriorityQuery);
      console.log('✅ Prioridades atualizadas');
    }

    // Verificar dados inseridos
    const countQuery = `
      SELECT 
        (SELECT COUNT(*) FROM leads) as total_leads,
        (SELECT COUNT(*) FROM properties) as total_properties,
        (SELECT COUNT(*) FROM leads WHERE prioritario = true) as leads_prioritarios;
    `;

    const result = await client.query(countQuery);
    const stats = result.rows[0];

    console.log('\n📊 Estatísticas do banco:');
    console.log(`   Total de leads: ${stats.total_leads}`);
    console.log(`   Total de propriedades: ${stats.total_properties}`);
    console.log(`   Leads prioritários: ${stats.leads_prioritarios}`);

    await client.end();
    console.log('\n🎉 Banco populado com sucesso!');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

populateDatabase();