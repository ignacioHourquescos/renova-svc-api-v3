const con = require("../../config/conexionbd");
const { queries } = require("./client-queries");

function getDiscountByClientNumber(req, res) {
	const clientNumber = req.params.clientNumber;

	con.query(
		queries.getDiscountByClientNumber_query(clientNumber),
		function (error, result, fields) {
			if (error) {
				console.log("Database query error", error.message);
				return res.status(500).send("Database query error");
			}
			res.send(JSON.stringify(result.recordsets[0]));
		}
	);
}

function getListCodeByClientNumber(req, res) {
	const clientNumber = req.params.clientNumber;

	con.query(
		queries.getListCodeById_query(clientNumber),
		function (error, result, fields) {
			if (error) {
				console.log("Database query error", error.message);
				return res.status(500).send("Database query error");
			}
			res.send(JSON.stringify(result.recordsets[0]));
		}
	);
}

function getClientById(req, res) {
	const clientId = req.params.id;

	con.query(
		queries.getClientById_query(clientId),
		function (error, result, fields) {
			if (error) {
				console.log("Database query error", error.message);
				return res.status(500).send("Database query error");
			}
			res.send(JSON.stringify(result.recordsets[0]));
		}
	);
}

module.exports = {
	getDiscountByClientNumber,
	getListCodeByClientNumber,
	getClientById,
};
