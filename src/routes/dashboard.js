const express = require('express');
const path = require('path');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
    const ruta = path.join(__dirname, '..', '..', 'public', 'dashboardFiles', 'index.html');
    res.sendFile(ruta);
});

module.exports = router;
