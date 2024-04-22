const pool = require('../config/database');

async function createEvent(eventData, emailUsuario) {
    try {
        const { titulo, data_inicio, data_final, horario_inicio, horario_final } = eventData;
        const query = `INSERT INTO eventos (titulo, data_inicio, data_final, horario_inicio, horario_final, usuario_email) 
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [titulo, data_inicio, data_final, horario_inicio, horario_final, emailUsuario];
        const result = await pool.query(query, values);

        return result.rows[0];
    } catch(error) {
        throw new Error('Erro ao criar evento: ' + error.message);
    }
}

module.exports = {
    createEvent
};
