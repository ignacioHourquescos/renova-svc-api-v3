const express = require("express");
const router = express.Router();
const clientController = require("../controller/client/client-controller");

// ==========================================
// RUTAS DE CLIENTES - API REST
// Nuevas rutas organizadas siguiendo
// convenciones REST modernas
// ==========================================

// GET /api/clients - Obtener todos los clientes
// router.get("/", clientController.getAllClients);

// GET /api/clients/:id - Obtener cliente por ID
// router.get("/:id", clientController.getClientById);

// GET /api/clients/search?query=term - Buscar clientes
// router.get("/search", clientController.searchClients);

// Discount-related routes
router.get(
	"/:clientNumber/discount",
	clientController.getDiscountByClientNumber
);

// List code route
router.get(
	"/:clientNumber/list-code",
	clientController.getListCodeByClientNumber
);

// Account-related routes
// router.get("/:clientId/account", clientController.getClientAccount);
// router.get("/:clientId/balance", clientController.getClientBalance);
// router.get("/:clientId/credit-limit", clientController.getCreditLimit);

// Voucher-related routes
// router.get("/:clientId/vouchers", clientController.getClientVouchers);
// router.get("/:clientId/vouchers/pending", clientController.getPendingVouchers);
// router.get("/:clientId/vouchers/overdue", clientController.getOverdueVouchers);

// Order-related routes
// router.get("/:clientId/orders", clientController.getClientOrders);
// router.get("/:clientId/orders/history", clientController.getOrderHistory);

// Authentication routes
// router.post("/authenticate", clientController.authenticateClient);
// router.post("/login", clientController.loginClient);

// POST /api/clients - Crear nuevo cliente (para futuro)
// router.post("/", clientController.createClient);

// PUT /api/clients/:id - Actualizar cliente (para futuro)
// router.put("/:id", clientController.updateClient);

// DELETE /api/clients/:id - Eliminar cliente (para futuro)
// router.delete("/:id", clientController.deleteClient);

module.exports = router;
