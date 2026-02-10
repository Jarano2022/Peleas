const jwt = require('jsonwebtoken');
const { tokenKey: SECRET_KEY } = require('../../config/env');

const Express = require('express');
const app = Express();
const login = require('../../services/mssql');

// 1. Añadimos 'async' aquí
app.post('/', async (req, res) => { 
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // 2. Ponemos 'await' para esperar la respuesta de la DB y Bcrypt
        const resultado = await login(username, password); 

        if (resultado.success) {
            const token = jwt.sign(
                { username: username }, 
                SECRET_KEY, 
                { expiresIn: '1h' }
            );
            res.json({ success: true, token });
        } else {
            // Ahora resultado.message sí tendrá el valor correcto
            res.status(401).json({ success: false, message: resultado.message });
        }
    } catch (error) {
        res.status(500).send(`Login error: ${error.message}`);
    }
});

module.exports = app;