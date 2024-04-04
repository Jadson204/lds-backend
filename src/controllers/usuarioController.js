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
        const usuario = await usuarioService.getUser(req.params.email);
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Usuário não encontrado:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

async function deleteUser(req, res) {
    try {
        const result = await usuarioService.deleteUser(req.params.email); // Chama o método deleteUser do serviço
        if (result.success) { // Verifica se a exclusão foi bem-sucedida
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' }); // Se o usuário não existir
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function loginUserHandler(req, res) {
    try {
        const { email, password } = req.body;

        // Verifica se o email e a senha foram fornecidos
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Tenta fazer login do usuário com o email e a senha fornecidos
        const user = await usuarioService.loginUser(email, password);

        // Se o login for bem-sucedido, retorna os dados do usuário
        res.status(200).json(user);
    } catch (error) {
        // Se ocorrer um erro durante o login, retorna uma mensagem de erro
        console.error('Erro ao fazer login:', error.message);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

async function updateUserHandler(req, res) {
    try {
        const userEmail = req.params.email;
        const updatedUserData = req.body;

        // Verifica se o email está presente no corpo da requisição
        if (!Object.keys(updatedUserData).length) {
            return res.status(400).json({ error: 'Nenhum dado fornecido para atualização' });
        }

        // Verifica se o email está sendo alterado nos dados fornecidos
        if ('email' in updatedUserData) {
            return res.status(400).json({ error: 'O email não pode ser alterado' });
        }

        // Atualiza as informações do usuário no banco de dados
        const updatedUser = await usuarioService.updateUser(userEmail, updatedUserData);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
}


module.exports = {
    createUser,
    getUser,
    deleteUser,
    loginUserHandler,
    updateUserHandler
}