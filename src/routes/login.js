const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const ruta = path.join(__dirname, '..', '..', 'public', 'loginFiles', 'index.html');
    fs.readFile(ruta, (err, data) => {
        if (err) {
            res.status(500).send(`Error reading index.html: ${err.message}`);
        } else {
            res.status(200);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

module.exports = router;
