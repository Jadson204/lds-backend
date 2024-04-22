// Importa o módulo express, que é um framework para aplicativos web Node.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importa as rotas relacionadas aos usuários
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');

// Cria uma instância do aplicativo Express
const app = express();

// Adiciona um middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adicione o middleware cors para permitir solicitações de origens diferentes
app.use(cors());

// Configura as rotas da aplicação
// Todas as requisições para '/api' serão tratadas pelas rotas definidas em usuarioRoutes
app.use('/api', usuarioRoutes);
app.use('/api', eventoRoutes);

// Define a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express para escutar requisições na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})