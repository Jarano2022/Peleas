const sql = require("mssql/msnodesqlv8");
const sqlconfig = require("../config/mmsql");
const { verificarPassword } = require("./hash"); // Importamos la función auxiliar

const login = async (username, passwordPlana) => {
    try {
        const server = await sql.connect(sqlconfig);

        const result = await server
            .request()
            .input("username", sql.NVarChar(50), username) // Coincidiendo con tu nvarchar(50) de la imagen
            .query(`SELECT password FROM cuentas WHERE username = @username`);

        if (result.recordset.length === 0) {
            return { success: false, message: "Usuario no existe" };
        }

        // Recuperamos el hash de la columna 'password' (fíjate que en tu imagen es minúscula)
        const hashGuardado = result.recordset[0].password;

        const hashEnDB = result.recordset[0].password;
        console.log("Hash exacto en DB: '" + hashEnDB + "'"); // Las comillas simples ayudan a ver espacios
        console.log("Longitud del hash:", hashEnDB.length);

        // Validamos con la función auxiliar que creamos
        const esValido = await verificarPassword(passwordPlana, hashGuardado);
        console.log("¿Es match?:", esValido);
        if (esValido === true) {
            // Forzamos la comparación con true
            return { success: true };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = login;
