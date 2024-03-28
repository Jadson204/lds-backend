// Importa o módulo express, que é um framework para aplicativos web Node.js
const express = require('express');

// Importa as rotas relacionadas aos usuários
const usuarioRoutes = require('./routes/usuarioRoutes');

// Cria uma instância do aplicativo Express
const app = express();

// Adiciona um middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Configura as rotas da aplicação
// Todas as requisições para '/api' serão tratadas pelas rotas definidas em usuarioRoutes
app.use('/api', usuarioRoutes);

// Define a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express para escutar requisições na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})