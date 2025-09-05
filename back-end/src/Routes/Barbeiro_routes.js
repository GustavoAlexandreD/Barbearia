const express = require('express');
const Barbeiro_controller = require('../Controller/Barbeiro_controller');


const Barbeiro_routes = express.Router();
Barbeiro_routes.get('/barbeiros', Barbeiro_controller.listar);
Barbeiro_routes.get('/barbeiros/:id', Barbeiro_controller.consultarPorID);
Barbeiro_routes.post('/barbeiros', Barbeiro_controller.criar);
Barbeiro_routes.put('/barbeiros/:id', Barbeiro_controller.atualizar);
Barbeiro_routes.delete('/barbeiros/:id', Barbeiro_controller.deletar);

module.exports = Barbeiro_routes;