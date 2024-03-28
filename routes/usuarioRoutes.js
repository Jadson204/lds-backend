const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rota de criação de um novo usuário
router.post('/usuarios', usuarioController.createUser);

module.exports = router;