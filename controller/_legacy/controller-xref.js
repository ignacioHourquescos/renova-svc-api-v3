const levenshtein = require("fastest-levenshtein");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
var con = require("../../config/conexionbd");

function getXrefList(req, res) {
	var array = [];
	let article = req.query.article;
	const csvPath = path.join(__dirname, "../../XREF.csv");
	const results = [];

	// Leer el archivo CSV
	fs.createReadStream(csvPath)
		.pipe(csv())
		.on("data", (row) => {
			results.push(row);
		})
		.on("end", () => {
			let suggestions = [];

			// Procesar cada fila del CSV (ya sin el header)
			for (var i = 0; i < results.length; i++) {
				const row = results[i];
				// Crear un array con todos los valores de la fila para buscar coincidencias
				const rowValues = [
					row.Categoria,
					row["Sub categoria 1"],
					row["Sub categoria 2"],
					row.OEM,
					row.FRAM,
					row.Tecfil,
					row.Wega,
					row.Mann,
					row.Mahle,
					row.Wix,
				].filter((val) => val && val.trim() !== ""); // Filtrar valores vacíos

				// Check if the parameter matches exactly
				if (
					rowValues.some(
						(value) => value.toLowerCase() === article.toLowerCase()
					)
				) {
					array.push({
						categoria: row.Categoria,
						subCategoria1: row["Sub categoria 1"],
						subCategoria2: row["Sub categoria 2"],
						oem: row.OEM || "",
						fram: row.FRAM || "",
						tecfil: row.Tecfil || "",
						wega: row.Wega || "",
						mann: row.Mann || "",
						mahle: row.Mahle || "",
						wix: row.Wix || "",
					});
				} else {
					// If not an exact match, calculate Levenshtein distance and convert to similarity score
					let distances = rowValues.map((value) =>
						levenshtein.distance(article, value)
					);
					let minDistance = Math.min(...distances);

					// You may want to adjust a threshold for what you consider a good match
					if (minDistance <= 1.5) {
						// Add only the codes that are similar
						let similarCodes = rowValues.filter((value) => {
							return levenshtein.distance(article, value) <= 1.5;
						});
						suggestions.push(...similarCodes);
					}
				}
			}

			res.send(JSON.stringify({ results: array, suggestions }));
		})
		.on("error", (error) => {
			console.error("Error reading CSV file:", error);
			res.status(500).send("Internal Server Error");
		});
}

const getSpecificArticle = (req, res) => {
	let article = req.query.article;
	console.log(article);

	// Try to find an exact match based on a.cod_articulo
	var sqlExact = `SELECT
        a.cod_articulo AS id,
        a.descrip_arti AS d,
        i.precio_vta AS p,
        ag.codi_agru AS r,
        a.cant_stock AS s
      FROM articulos a
      JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
      JOIN listas_items i ON a.cod_articulo = i.articulo
      WHERE a.cod_articulo = '${article}'
        AND a.activo = 'S'
        AND i.lista_codi = '2'
        AND ag.descrip_agru <> 'AGRUPACION PRUEBA'
        AND ag.descrip_agru <> 'OFERTAS FRAM'
      ORDER BY r ASC, id ASC;`;

	con.query(sqlExact, function (error, exactResult, fields) {
		if (error) {
			console.log("Hubo un error en la consulta (exact match)", error.message);
			return res.status(500).send("Hubo un error en la consulta");
		}

		// If there's an exact match, send only that result
		if (exactResult.length > 0) {
			return res.send(JSON.stringify(exactResult));
		}

		// If no exact match, try a similar match based on a.cod_articulo and a.descrip_arti
		var sqlSimilar = `SELECT
            a.cod_articulo AS id,
            a.descrip_arti AS d,
            i.precio_vta AS p,
            ag.codi_agru AS r,
            a.cant_stock AS s
          FROM articulos a
          JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
          JOIN listas_items i ON a.cod_articulo = i.articulo
          WHERE (a.cod_articulo LIKE '%${article}%' OR
                 a.descrip_arti LIKE '%${article}%')
            AND a.activo = 'S'
            AND i.lista_codi = '2'
            AND ag.descrip_agru <> 'AGRUPACION PRUEBA'
            AND ag.descrip_agru <> 'OFERTAS FRAM'
          ORDER BY r ASC, id ASC;`;

		// ...

		con.query(sqlSimilar, function (error, similarResult, fields) {
			if (error) {
				console.log(
					"Hubo un error en la consulta (similar match)",
					error.message
				);
				return res.status(500).send("Hubo un error en la consulta");
			}

			// Extract and send only the relevant data from the first recordset
			const responseData =
				similarResult &&
				similarResult.recordsets &&
				similarResult.recordsets[0];

			if (responseData && responseData.length > 0) {
				res.send(JSON.stringify(responseData));
			} else {
				res.send(JSON.stringify([])); // Send an empty array if no results found
			}
		});

		// Send the result of the similar match
	});
};

module.exports = {
	getSpecificArticle: getSpecificArticle,
	getXrefList: getXrefList,
};
