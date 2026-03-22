const Router = require('express').Router();
const { verificarToken } = require('../../middleware/auth');

// Ruta para verificar token desde cliente (usa header Authorization: Bearer <token>)
Router.get('/', verificarToken, (req, res) => {
    // Si el middleware pasa, el token es válido
    res.json({ valid: true, user: req.usuario });
});

module.exports = Router;
