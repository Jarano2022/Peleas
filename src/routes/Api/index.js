const Router = require('express').Router();
const login = require('./login');

Router.use('/login', login);

module.exports = Router;