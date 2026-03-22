// Función para manejar las rutas de la aplicación
const routes = require('express').Router();

// Importar las rutas
const login = require('./login');
const api = require('./Api');
const dashboard = require('./dashboard');

routes.use('/', login);
routes.use('/api', api);
routes.use('/dashboard', dashboard);

module.exports = routes;
