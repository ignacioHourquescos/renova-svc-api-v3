const con = require("../../config/conexionbd");
const { queries } = require("./article-queries");

function getNegativeStock(req, res) {
	var sql =
		"select cod_articulo as id, descrip_arti as d, cant_stock as s from articulos where cant_stock<0 and activo='S' order by cant_stock ASC";
	con.query(sql, function (error, result, fields) {
		if (error) {
			console.log("Database query error", error.message);
			return res.status(500).send("Database query error");
		}
		res.send(JSON.stringify(result.recordsets[0]));
	});
}

function getArticleById(req, res) {
	const id = req.params.id;
	const listCode = req.query.listCode || "2";

	if (!id) {
		return res
			.status(400)
			.json({ error: "El código de artículo es requerido" });
	}

	con.query(
		queries.getArticleById_query(id, listCode),
		function (error, resultado, fields) {
			if (error) {
				console.log("Hubo un error en la consulta", error.message);
				return res.status(500).send("Hubo un error en la consulta");
			}
			res.send(JSON.stringify(resultado.recordsets[0]));
		}
	);
}

module.exports = {
	getNegativeStock,
	getArticleById,
};
