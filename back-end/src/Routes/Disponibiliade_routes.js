const express = require('express');
const Disponibilidade_controller = require('../Controller/Disponibilidade_controller');


const Disponibilidade_routes = express.Router();

// Rotas para disponibilidade
Disponibilidade_routes.get('/disponibilidade', Disponibilidade_controller.listar);
Disponibilidade_routes.get('/disponibilidade/barbeiro/:id_barbeiro', Disponibilidade_controller.listarPorBarbeiro);
Disponibilidade_routes.get('/disponibilidade/:id', Disponibilidade_controller.consultarPorID);
Disponibilidade_routes.post('/disponibilidade', Disponibilidade_controller.criar);
Disponibilidade_routes.put('/disponibilidade/:id', Disponibilidade_controller.atualizar);
Disponibilidade_routes.delete('/disponibilidade/:id', Disponibilidade_controller.deletar);

// Rota para criar múltiplas disponibilidades de uma vez
Disponibilidade_routes.post('/disponibilidade/multiplas', Disponibilidade_controller.criarMultiplas);

module.exports = Disponibilidade_routes;
