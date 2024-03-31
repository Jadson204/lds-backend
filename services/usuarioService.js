const pool = require('../config/database');

async function createUser(dadosUsuario) {
    try {
        const query = 'INSERT INTO users (username, email, password, favoriteActivity) VALUES($1, $2, $3, $4)';
        const values = [dadosUsuario.username, dadosUsuario.email, dadosUsuario.password, dadosUsuario.favoriteActivity];
        const result = await pool.query(query, values);

        console.log('Usuário cadastrado com sucesso!');
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao cadastrar usuário: ' + error);
    }
}

async function getUser(email) {
    try {
        const query = 'SELECT username, favoriteActivity FROM users WHERE email = $1';
        const values = [email];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const { username, favoritectivity } = result.rows[0];
        return { username, favoritectivity };
    } catch (error) {
        throw new Error('Erro ao buscar usuário por email: ' + error.message);
    }
}

async function deleteUser(email) {
    try {
        const query = 'DELETE FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        console.log('Usuário deletado com sucesso');
        return { success: true, message: 'Usuário deletado com sucesso' };
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw new Error('Erro ao excluir usuário: ' + error.message);
    }
}

module.exports = {
    createUser,
    getUser,
    deleteUser
};
