var sql = require("mssql");
require("dotenv").config();

// config for your database using environment variables
var config = {
	user: process.env.DB_USER || "rnv_admin",
	password: process.env.DB_PASSWORD || "Rnv_12345",
	server: process.env.DB_HOST || "200.80.10.160",
	database: process.env.DB_NAME || "factu_renova",
	options: {
		encrypt: false,
		enableArithAbort: true,
		trustServerCertificate: true,
		port: parseInt(process.env.DB_PORT) || 50322,
		path: process.env.DB_PATH || "/RPSISTEMAS",
	},
};

// Intentar conectar a la base de datos
var connection = sql.connect(config, function (err) {
	if (err) {
		console.error("Error de conexión a la base de datos:", err);
	} else {
		console.log("Conexión exitosa a la base de datos");
	}
});

module.exports = connection;
