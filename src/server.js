const app = require('./app')
const config = require('./config/env');

const PORT = config.port || 3000;

app.listen(PORT, () => {
    console.log(`
        Servidor corriendo en: 
        http://localhost:${PORT},
        http://127.0.0.1:${PORT}.`
    );
});