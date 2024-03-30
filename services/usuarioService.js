const pool = require('../config/database');

async function createUser(dadosUsuario) {
    try {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES($1, $2, $3)';
        const values = [dadosUsuario.nome, dadosUsuario.email, dadosUsuario.senha];
        const result = await pool.query(query, values);

        console.log('Usuário cadastrado com sucesso!');
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao cadastrar usuário: ' + error);
    }
}

async function getUser(id) {
    try {
        const query = 'SELECT (nome, email) FROM usuarios WHERE id = $1';
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const { nome, email } = result.rows[0];
        return { nome, email };
    } catch (error) {
        throw new Error('Erro ao buscar usuário por id: ' + error.message);
    }
}

module.exports = {
    createUser,
    getUser
};
