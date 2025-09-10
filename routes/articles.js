const express = require("express");
const router = express.Router();
const articleController = require("../controller/article/article-controller");

// ==========================================
// RUTAS DE ARTÍCULOS - API REST
// Nuevas rutas organizadas siguiendo
// convenciones REST modernas
// ==========================================

// GET /api/articles/stock/negative - Obtener artículos con stock negativo
router.get("/stock/negative", articleController.getNegativeStock);

// GET /api/articles/prices/list/:listCode - Obtener precios por código de lista
router.get("/prices/list/:listCode", articleController.getPricesByListCode);

// GET /api/articles/:id - Obtener artículo por ID
router.get("/:id", articleController.getArticleById);

module.exports = router;
