const { getFirestore, admin } = require("../../config/firestore");

async function registrarIngresoALista(req, res) {
	try {
		const body = req.body || {};
		const client = body.Client ?? body.client ?? body.clientName ?? "";
		const listCode = body.listCode ?? body.list_code ?? "";
		const tipo = body.tipo ?? body.type ?? "api";

		if (!client || !listCode) {
			return res.status(400).json({
				error: "Campos requeridos faltantes",
				message: "Client y listCode son obligatorios",
			});
		}

		const db = getFirestore();
		const docRef = await db.collection("ingreso_a_listas").add({
			Client: client,
			fecha: admin.firestore.Timestamp.now(),
			listCode: listCode,
			tipo: tipo,
		});

		return res.status(201).json({
			success: true,
			id: docRef.id,
			message: "Ingreso registrado correctamente",
		});
	} catch (err) {
		console.error("Error al registrar ingreso a lista:", err);
		return res.status(500).json({
			error: "Error interno",
			message: err.message,
		});
	}
}

module.exports = { registrarIngresoALista };
