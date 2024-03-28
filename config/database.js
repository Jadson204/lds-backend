const { Pool } = require('pg');
require('dotenv').config();

// Configurações do banco de dados
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Testar a conexão com o banco de dados
pool.connect((err, client, release) => {
    if(err) {
        return console.log.error('Erro ao conectar com o banco de dados:', err);
    }
    console.log('Conexão bem-sucedida com o banco de dados');
    release(); // "Liberar" o usuário para outros usos
});

module.exports = pool;