const express = require("express");
const router = express.Router();
const ingresoController = require("../controller/ingreso-a-listas/ingreso-a-listas-controller");

router.post("/", ingresoController.registrarIngresoALista);

module.exports = router;
