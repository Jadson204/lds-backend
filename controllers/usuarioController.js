const usuarioService = require('../services/usuarioService');

async function createUser(req, res) {
    try {
        const novoUsuario = await usuarioService.createUser(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function getUser(req, res) {
    try {
        const usuario = await usuarioService.getUser(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Usuário não encontrado:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

module.exports = {
    createUser,
    getUser
}