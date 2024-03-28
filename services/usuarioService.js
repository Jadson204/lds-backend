const pool = require('../config/database');

async function createUser(dadosUsuario) {
    try {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES($1, $2, $3)';
        const values = [dadosUsuario.nome, dadosUsuario.email, dadosUsuario.senha];
        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao cadastrar usuário: ' + error);
    }
}

module.exports = {
    createUser,
};
