const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rota de criação de um novo usuário
router.post('/usuarios', usuarioController.createUser);
router.get('/usuarios/:id', usuarioController.getUser);
router.delete('/usuarios/:email', usuarioController.deleteUser);

module.exports = router;