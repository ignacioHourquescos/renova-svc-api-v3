const express = require("express");
const router = express.Router();
const legacyController = require("../controller/_legacy/controller");

// ==========================================
// RUTAS LEGACY - NO MODIFICAR
// Estas rutas deben mantenerse intactas para
// compatibilidad con aplicaciones existentes
// ==========================================


// Rutas de listas y detalles
router.get("/lista/:id", legacyController.obtenerListaDetalle);
router.get("/listado-articulos", legacyController.obtenerListadoArticulos);
router.get(
	"/obtenerListadoArticulos",
	legacyController.obtenerListadoArticulos
); // Ruta para compatibilidad frontend
router.get(
	"/listado-articulos-por-lista",
	legacyController.obtenerListadoArticulosPorLista
);
router.get(
	"/obtenerListadoArticulosPorLista",
	legacyController.obtenerListadoArticulosPorLista
); // Ruta para compatibilidad frontend

// Rutas de ofertas
router.get("/ofertas-kits", legacyController.obtenerOfertasKits);
router.get("/obtenerOfertasKits", legacyController.obtenerOfertasKits); // Compatibilidad frontend
router.get("/ofertas-fram", legacyController.obtenerOfertasFram);
router.get("/obtenerOfertasFram", legacyController.obtenerOfertasFram); // Compatibilidad frontend
router.get("/ofertas-mensuales", legacyController.obtenerOfertasMensuales);
router.get(
	"/obtenerOfertasMensuales",
	legacyController.obtenerOfertasMensuales
); // Compatibilidad frontend
router.get("/ofertas-valvoline", legacyController.ofertasValvoline);
router.get("/ofertasValvoline", legacyController.ofertasValvoline); // Compatibilidad frontend
router.get(
	"/ofertas-valvoline-varios",
	legacyController.ofertasValvolineVarios
);
router.get("/ofertasValvolineVarios", legacyController.ofertasValvolineVarios); // Compatibilidad frontend
router.get("/ofertas-motul", legacyController.ofertasMotul);
router.get("/ofertasMotul", legacyController.ofertasMotul); // Compatibilidad frontend
router.get("/ofertas-total", legacyController.ofertasTotal);
router.get("/ofertasTotal", legacyController.ofertasTotal); // Compatibilidad frontend
router.get("/ofertas-selenia", legacyController.ofertasSelenia);
router.get("/ofertasSelenia", legacyController.ofertasSelenia); // Compatibilidad frontend
router.get("/ofertas-puma", legacyController.ofertasPuma);
router.get("/ofertasPuma", legacyController.ofertasPuma); // Compatibilidad frontend
router.get("/ofertas-varios", legacyController.ofertasVarios);
router.get("/ofertasVarios", legacyController.ofertasVarios); // Compatibilidad frontend

// Rutas de stock
router.get("/stock-critico", legacyController.obtenerStockCritico);
router.get("/obtenerStockCritico", legacyController.obtenerStockCritico); // Compatibilidad frontend
router.get("/stock-negativo", legacyController.stockNegativo);
router.get("/stockNegativo", legacyController.stockNegativo); // Compatibilidad frontend
router.get("/stock-articulo", legacyController.obtenerStockArticulo);
router.get("/obtenerStockArticulo", legacyController.obtenerStockArticulo); // Compatibilidad frontend
router.get("/stock-by-um", legacyController.stockByUm);
router.get("/stockByUm", legacyController.stockByUm); // Compatibilidad frontend
router.get("/inventory-by-um/:um", legacyController.inventoryByUM);
router.get("/inventoryByUM/:um", legacyController.inventoryByUM); // Compatibilidad frontend
router.get("/detailed-um", legacyController.detailedUm);
router.get("/detailedUm", legacyController.detailedUm); // Compatibilidad frontend

// Rutas de artículos legacy
router.get("/articulo", legacyController.obtenerArticulo);
router.get("/obtenerArticulo", legacyController.obtenerArticulo); // Compatibilidad frontend
router.get(
	"/agrupacion-articulo",
	legacyController.obtenerAgrupacionDeArticulo
);
router.get(
	"/obtenerAgrupacionDeArticulo",
	legacyController.obtenerAgrupacionDeArticulo
); // Compatibilidad frontend
router.get("/remate-mercaderia", legacyController.remateMercaderia);
router.get("/remateMercaderia", legacyController.remateMercaderia); // Compatibilidad frontend
router.get("/vinto", legacyController.obtenerVinto);
router.get("/obtenerVinto", legacyController.obtenerVinto); // Compatibilidad frontend
router.get("/specific-article", legacyController.getSpecificArticle);
router.get("/getSpecificArticle", legacyController.getSpecificArticle); // Compatibilidad frontend

// Rutas de referencias cruzadas (XREF)
router.get("/xref", legacyController.getXrefList);
router.get("/getXrefList", legacyController.getXrefList); // Compatibilidad frontend

// Rutas de clientes legacy
router.get("/clientes", legacyController.listadoClientes);
router.get("/listadoClientes", legacyController.listadoClientes); // Compatibilidad frontend
router.get("/clientes-por-vendedor", legacyController.clientesPorVendedor);
router.get("/clientesPorVendedor", legacyController.clientesPorVendedor); // Compatibilidad frontend
router.get("/cliente", legacyController.getClient);
router.get("/getClient", legacyController.getClient); // Ruta adicional para compatibilidad
router.get("/cliente-comprobantes", legacyController.getClientVouchers);
router.get("/getClientVouchers", legacyController.getClientVouchers); // Compatibilidad frontend
router.get(
	"/comprobantes-vencidos/:nroCliente",
	legacyController.comprobantesVencidos
);
router.get(
	"/comprobantesVencidos/:nroCliente",
	legacyController.comprobantesVencidos
); // Compatibilidad frontend

// Rutas de pedidos
router.get("/informacion-pedidos", legacyController.informacionPedidos);
router.get("/informacionPedidos", legacyController.informacionPedidos); // Compatibilidad frontend
router.get(
	"/informacion-pedidos-fecha",
	legacyController.informacionPedidosFecha
);
router.get(
	"/informacionPedidosFecha",
	legacyController.informacionPedidosFecha
); // Compatibilidad frontend

// Rutas de ventas
router.get("/ventas-por-agrupacion", legacyController.ventasPorAgrupacion);
router.get("/ventasPorAgrupacion", legacyController.ventasPorAgrupacion); // Compatibilidad frontend
router.get("/ventas-generales", legacyController.ventasGenerales);
router.get("/ventasGenerales", legacyController.ventasGenerales); // Compatibilidad frontend
router.get("/ultimas-ventas", legacyController.ultimasVentas);
router.get("/ultimasVentas", legacyController.ultimasVentas); // Compatibilidad frontend

// Ruta principal que devuelve las listas
router.get("/", legacyController.obtenerListas);
// Rutas de gastos y autenticación
router.get("/expenses", legacyController.getExpenses);
router.get("/getExpenses", legacyController.getExpenses); // Compatibilidad frontend
router.post("/validate-user", legacyController.validateUser);
router.post("/validateUser", legacyController.validateUser); // Compatibilidad frontend
router.post("/general-validate-user", legacyController.generalValidateUser);
router.post("/generalValidateUser", legacyController.generalValidateUser); // Compatibilidad frontend

module.exports = router;
