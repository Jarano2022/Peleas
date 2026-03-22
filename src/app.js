const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { verificarToken } = require('./middleware/auth');

const app = express();

app.use(cors({ origin: '12.10.10.67' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '..', 'public');
app.use('/dashboardFiles', verificarToken, express.static(path.join(publicPath, 'dashboardFiles')));
app.use(express.static(publicPath));

app.use('/', routes);

module.exports = app;
