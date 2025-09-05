const express = require('express');
const Cliente_controller = require('../Controller/Cliente_controller');

const Cliente_routes = express.Router();

// Rotas para clientes
Cliente_routes.get('/clientes', Cliente_controller.listar);
Cliente_routes.get('/clientes/:id', Cliente_controller.consultarPorID);
Cliente_routes.post('/clientes', Cliente_controller.criar);
Cliente_routes.put('/clientes/:id', Cliente_controller.atualizar);
Cliente_routes.delete('/clientes/:id', Cliente_controller.deletar);

module.exports = Cliente_routes;