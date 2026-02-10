const express = require("express");
const cors = require("cors"); // Asegúrate de tener instalado 'cors' vía npm
const routes = require("./routes");
const path = require("path");

const app = express();

// 1. Configurar CORS primero
app.use(cors({ origin: "12.10.10.67" }));

// 2. Otras configuraciones (JSON, etc.)
app.use(express.json()); // Para peticiones fetch/JSON
app.use(express.urlencoded({ extended: true })); // Para formularios HTML

app.use(express.static(path.join(__dirname, '..', 'public')));

// 3. Rutas
app.use("/", routes);

module.exports = app;