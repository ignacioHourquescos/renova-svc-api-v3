const express = require("express");
const router = express.Router();
const clientController = require("../controller/client/client-controller");

// ==========================================
// RUTAS DE CLIENTES - API REST
// Nuevas rutas organizadas siguiendo
// convenciones REST modernas
// ==========================================

// prettier-ignore-start
router.get("/:id", clientController.getClientById);
router.get(
	"/:clientNumber/discount",
	clientController.getDiscountByClientNumber
);
router.get(
	"/:clientNumber/list-code",
	clientController.getListCodeByClientNumber
);
// prettier-ignore-end

module.exports = router;
