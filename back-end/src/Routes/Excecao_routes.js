const express = require('express');
const Excecao_controller = require('../Controller/Excecao_controller');

const Excecao_routes = express.Router();

// Rotas para exceções
Excecao_routes.get('/excecoes', Excecao_controller.listar);
Excecao_routes.get('/excecoes/barbeiro/:id_barbeiro', Excecao_controller.listarPorBarbeiro);
Excecao_routes.get('/excecoes/data/:data', Excecao_controller.listarPorData);
Excecao_routes.get('/excecoes/:id', Excecao_controller.consultarPorID);
Excecao_routes.post('/excecoes', Excecao_controller.criar);
Excecao_routes.put('/excecoes/:id', Excecao_controller.atualizar);
Excecao_routes.delete('/excecoes/:id', Excecao_controller.deletar);

// Rota para criar múltiplas exceções de uma vez
Excecao_routes.post('/excecoes/multiplas', Excecao_controller.criarMultiplas);

module.exports = Excecao_routes;
