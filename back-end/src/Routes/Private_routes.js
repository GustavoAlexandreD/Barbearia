const express = require('express');
const Cliente_routes = require('./Cliente_routes.js');
const Barbeiro_routes = require('./Barbeiro_routes.js');
const Agenamento_routes = require('./Agenamento_routes.js');
const Disponibiliade_routes = require('./Disponibiliade_routes.js');
const Excecao_routes = require('./Excecao_routes.js');
const Slot_agendamento_routes = require('./Slot_agendamento_routes.js');
const Autenticacao_middleware = require('../Middleware/Autenticacao_middleware.js');

const Private_routes = express.Router();

// Aplicar middleware de autenticação em todas as rotas
Private_routes.use(Autenticacao_middleware);

// Usar as rotas existentes
Private_routes.use(Cliente_routes);
Private_routes.use(Barbeiro_routes);
Private_routes.use(Agenamento_routes);
Private_routes.use(Disponibiliade_routes);
Private_routes.use(Excecao_routes);
Private_routes.use(Slot_agendamento_routes);

module.exports = Private_routes;
