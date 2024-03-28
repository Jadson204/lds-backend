const usuarioService = require('../services/usuarioService');

async function createUser(req, res) {
    try {
        const novoUsuario = await usuarioService.criarUsuario(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    createUser
}