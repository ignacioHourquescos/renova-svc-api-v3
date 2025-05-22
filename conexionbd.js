require("dotenv").config();

console.log("Variables de entorno:", {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

var sql = require("mssql");

// config for your database
var config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: "200.80.10.160",
	path: "/RPSISTEMAS",
	port: 50322,
	database: "factu_renova",
	encrypt: false,
};

var connection = sql.connect(config, function (err) {
	if (err) console.log(err);
});

module.exports = connection;
