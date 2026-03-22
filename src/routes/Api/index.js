const Router = require('express').Router();
const login = require('./login');
const verify = require('./verify');

Router.use('/login', login);
Router.use('/verify', verify);

module.exports = Router;