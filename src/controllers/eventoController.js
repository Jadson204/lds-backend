const eventoService = require('../services/eventoService');

async function createEvent(req, res) {
    try {
        const emailUsuario = req.params.email; // Extrai o email do usuário da URL
        const evento = await eventoService.createEvent(req.body, emailUsuario);
        res.status(201).json(evento);
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        res.status(500).json({ error: 'Erro ao criar evento' });
    }
}

module.exports = {
    createEvent
}
