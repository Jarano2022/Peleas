const bcrypt = require('bcrypt');

/**
 * Genera un hash seguro para una contraseña.
 */
async function crearHash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Compara contraseña vs hash y devuelve true/false.
 */
async function verificarPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error("Error en la validación:", error);
        return false;
    }
}

// Exportamos las funciones para usarlas en otros archivos
module.exports = {
    crearHash,
    verificarPassword
};