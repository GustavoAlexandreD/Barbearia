const express = require('express');
const Agendamento_controller = require('../Controller/Agendamento_controller');


const Agendamento_routes = express.Router();
// Rotas para agendamentos
Agendamento_routes.get('/agendamentos', Agendamento_controller.listar);
Agendamento_routes.get('/agendamentos/cliente/:id_cliente', Agendamento_controller.listarPorCliente);
Agendamento_routes.get('/agendamentos/barbeiro/:id_barbeiro', Agendamento_controller.listarPorBarbeiro);
Agendamento_routes.get('/agendamentos/:id', Agendamento_controller.consultarPorID);
Agendamento_routes.post('/agendamentos', Agendamento_controller.criar);
Agendamento_routes.put('/agendamentos/:id', Agendamento_controller.atualizar);
Agendamento_routes.delete('/agendamentos/:id', Agendamento_controller.deletar);

// Rotas para operações específicas
Agendamento_routes.patch('/agendamentos/:id/cancelar', Agendamento_controller.cancelar);
Agendamento_routes.patch('/agendamentos/:id/finalizar', Agendamento_controller.finalizar);

module.exports = Agendamento_routes;
