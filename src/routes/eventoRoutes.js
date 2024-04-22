const express = require('express');
const eventoController = require('../controllers/eventoController');

const router = express.Router();

router.post('/usuarios/:email/eventos', eventoController.createEvent);
// router.get('/eventos', eventoController.getAllevents);
// router.get('/eventos/:id', eventoController.getEventById);
// router.put('/eventos/:id', eventoController.updateEvent);
// router.delete('/eventos/:id', eventoController.deleteEvent);

module.exports = router;