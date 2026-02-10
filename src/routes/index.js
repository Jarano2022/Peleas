const express = require('express');

const routes = express.Router();
const login = require('./login');
const api = require('./Api');

routes.get('/', login);
routes.use('/api', api);

module.exports = routes;