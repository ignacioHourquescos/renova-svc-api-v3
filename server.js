//paquetes necesarios para el proyecto
var express = require("express");
var PORT = process.env.PORT || 5555;
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");

// Importar el router principal que maneja todas las rutas
const routes = require("./routes");

var app = express();
app.set("view engine");
app.use(cors());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());
app.use(express.static("/views/js"));
// view engine setup

app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "views")));

// ==========================================
// CONFIGURACIÓN DE RUTAS
// ==========================================
// Usar el router principal que maneja toda la organización
app.use("/", routes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Something went wrong!",
		message: err.message,
	});
});

// Middleware para rutas no encontradas
app.use("*", (req, res) => {
	res.status(404).json({
		error: "Route not found",
		message: `The route ${req.originalUrl} does not exist`,
	});
});

app.listen(PORT, function () {
	console.log("🚀 Escuchando en el puerto " + PORT);
	console.log("📊 API Info: http://localhost:" + PORT + "/api/info");
	console.log("❤️  Health Check: http://localhost:" + PORT + "/api/health");
});
