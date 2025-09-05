const express = require('express');
const Slot_agendamento_controller = require('../Controller/Slot_agendamento_controller');

const Slot_agendamento_routes = express.Router();
// Rotas para slots de agendamento
Slot_agendamento_routes.get('/slots', Slot_agendamento_controller.listar);
Slot_agendamento_routes.get('/slots/barbeiro/:id_barbeiro', Slot_agendamento_controller.listarPorBarbeiro);
Slot_agendamento_routes.get('/slots/disponiveis/:id_barbeiro/:data', Slot_agendamento_controller.listarDisponiveis);
Slot_agendamento_routes.get('/slots/:id', Slot_agendamento_controller.consultarPorID);
Slot_agendamento_routes.post('/slots', Slot_agendamento_controller.criar);
Slot_agendamento_routes.put('/slots/:id', Slot_agendamento_controller.atualizar);
Slot_agendamento_routes.delete('/slots/:id', Slot_agendamento_controller.deletar);

// Rotas para operações específicas
Slot_agendamento_routes.post('/slots/criar-multiplos', Slot_agendamento_controller.criarSlots);
Slot_agendamento_routes.patch('/slots/:id/status', Slot_agendamento_controller.atualizarStatus);

module.exports = Slot_agendamento_routes;
