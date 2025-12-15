const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres', // Substitua pela sua senha
  database: 'tm_crm'
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexão com PostgreSQL bem-sucedida!');
    
    const result = await client.query('SELECT NOW()');
    console.log('📅 Data/hora do servidor:', result.rows[0].now);
    
    await client.end();
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.log('\n🔧 Verifique:');
    console.log('1. PostgreSQL está rodando?');
    console.log('2. Banco "tm_crm" existe?');
    console.log('3. Usuário e senha estão corretos?');
  }
}

testConnection();