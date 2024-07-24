const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const upload = require('../config/upload');

const router = express.Router();

// Rota de criação de um novo usuário
router.post('/usuarios', usuarioController.createUser);
router.get('/usuarios/:email', usuarioController.getUser);
router.delete('/usuarios/:email', usuarioController.deleteUser);
router.post('/login', usuarioController.loginUserHandler);
router.patch('/usuarios/:email', usuarioController.updateUserHandler);
router.post('/usuarios/:email/upload', upload.single('profileImage'), usuarioController.uploadProfileImage);

module.exports = router;