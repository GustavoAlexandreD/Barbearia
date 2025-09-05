const express = require('express');
const Autorizacao_controller = require('../Controller/Autorizacao_controller.js');
const Public_routes = express.Router()

Public_routes.post('/login', Autorizacao_controller.login)

module.exports = Public_routes;