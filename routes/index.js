const express = require("express");
const router = express.Router();

// Importar todos los routers
const legacyRoutes = require("./legacy");
const articleRoutes = require("./articles");
const clientRoutes = require("./clients");

// ==========================================
// CONFIGURACIÓN DE RUTAS
// ==========================================

// Rutas legacy - mantener en la raíz para compatibilidad
// Estas rutas NO tienen prefijo para mantener compatibilidad
router.use("/", legacyRoutes);

// Nuevas APIs REST organizadas con prefijos
router.use("/api/articles", articleRoutes);
router.use("/api/clients", clientRoutes);

// Ruta de estado de la API
router.get("/api/health", (req, res) => {
	res.json({
		status: "OK",
		message: "Renova API v2 is running",
		timestamp: new Date().toISOString(),
		version: "2.0.0",
	});
});

// Ruta de información de la API
router.get("/api/info", (req, res) => {
	res.json({
		name: "Renova API v2",
		version: "2.0.0",
		description: "API para gestión de inventario y clientes Renova",
		endpoints: {
			legacy: "/ (sin prefijo - mantiene compatibilidad)",
			articles: "/api/articles",
			clients: "/api/clients",
			health: "/api/health",
		},
	});
});

module.exports = router;
