const pool = require('../config/database');
const bcrypt = require('bcrypt');

async function createUser(dadosUsuario) {
    try {
        const hashedPassword = await bcrypt.hash(dadosUsuario.password, 10);

        const query = 'INSERT INTO users (username, email, password, favoriteActivity) VALUES($1, $2, $3, $4)';
        const values = [dadosUsuario.username, dadosUsuario.email, hashedPassword, dadosUsuario.favoriteActivity];
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

async function verifyUserPassword(email, password) {
    try {
        const query = 'SELECT password FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        // Comparar a senha fornecida com a senha criptografada no banco de dados
        const hashedPassword = result.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        return passwordMatch;
    } catch (error) {
        throw new Error('Erro ao verificar senha do usuário: ' + error.message);
    }
}

async function loginUser(email, password) {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if(result.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos');
        }

        // Retorna o usuário encontrado se a senha estiver correta
        return user;
    } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.message);
    }
}

async function updateUser(userEmail, updatedUserData) {
    try {
        // Verificar se o email existe no banco de dados
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
        const checkEmailValues = [userEmail];
        const user = await pool.query(checkEmailQuery, checkEmailValues);

        if (user.rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        // Montar a query para atualização dos dados do usuário
        let updateQuery = 'UPDATE users SET ';
        let updateValues = [];
        let valueIndex = 1;

        // Iterar sobre os dados do usuário fornecidos na requisição
        for (const key in updatedUserData) {
            // Certifique-se de que o email não será atualizado
            if (key !== 'email') {
                updateQuery += `${key} = $${valueIndex}, `;
                updateValues.push(updatedUserData[key]);
                valueIndex++;
            }
        }

        // Remover a vírgula extra no final da query
        updateQuery = updateQuery.slice(0, -2);

        // Adicionar a condição WHERE para atualizar apenas o usuário com o email fornecido
        updateQuery += ` WHERE email = $${valueIndex}`;
        updateValues.push(userEmail);

        // Executar a query de atualização no banco de dados
        await pool.query(updateQuery, updateValues);

        return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    verifyUserPassword,
    loginUser,
    updateUser
};
