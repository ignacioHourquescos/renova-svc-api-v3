// ==========================================
// QUERIES PARA ARTÍCULOS
// Centralización de todas las consultas SQL
// relacionadas con artículos
// ==========================================

const queries = {
	// Query para obtener artículo por ID con código de lista
	getArticleById_query: (articleId, listCode = "2") => {
		return `
			SELECT 
				a.cod_articulo AS id,
				a.descrip_arti AS description,
				a.descrip_ARTI_WEB AS web_description,
				a.desc_adicional AS additional_description,
				i.precio_vta AS price,
				a.cant_stock AS stock,
				a.UM AS unit_measure,
				a.agru_1 AS category_1,
				a.agru_2 AS category_2,
				ag.descrip_agru AS category_description,
				a.web_imagen AS web_image,
				a.web_publi AS web_published
			FROM articulos a
			JOIN listas_items i ON a.cod_articulo = i.articulo
			LEFT JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
			WHERE a.cod_articulo = '${articleId}'
				AND a.activo = 'S'
				AND i.lista_codi = '${listCode}'
			ORDER BY a.cod_articulo ASC
		`;
	},

	// Query para obtener todos los artículos
	getAllArticles_query: (listCode = "2") => {
		return `
			SELECT 
				a.cod_articulo AS id,
				a.descrip_arti AS description,
				a.descrip_ARTI_WEB AS web_description,
				i.precio_vta AS price,
				a.cant_stock AS stock,
				a.UM AS unit_measure,
				ag.descrip_agru AS category_description
			FROM articulos a
			JOIN listas_items i ON a.cod_articulo = i.articulo
			LEFT JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
			WHERE a.activo = 'S'
				AND i.lista_codi = '${listCode}'
			ORDER BY a.cod_articulo ASC
		`;
	},

	// Query para buscar artículos por término
	searchArticles_query: (searchTerm, listCode = "2") => {
		return `
			SELECT 
				a.cod_articulo AS id,
				a.descrip_arti AS description,
				a.descrip_ARTI_WEB AS web_description,
				i.precio_vta AS price,
				a.cant_stock AS stock,
				a.UM AS unit_measure,
				ag.descrip_agru AS category_description
			FROM articulos a
			JOIN listas_items i ON a.cod_articulo = i.articulo
			LEFT JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
			WHERE a.activo = 'S'
				AND i.lista_codi = '${listCode}'
				AND (
					a.cod_articulo LIKE '%${searchTerm}%' OR
					a.descrip_arti LIKE '%${searchTerm}%' OR
					a.descrip_ARTI_WEB LIKE '%${searchTerm}%' OR
					a.desc_adicional LIKE '%${searchTerm}%'
				)
			ORDER BY a.cod_articulo ASC
		`;
	},

	// Query para obtener stock negativo
	getNegativeStock_query: () => {
		return `
			SELECT 
				cod_articulo AS id,
				descrip_arti AS description,
				cant_stock AS stock,
				UM AS unit_measure
			FROM articulos 
			WHERE cant_stock < 0 
				AND activo = 'S' 
			ORDER BY cant_stock ASC
		`;
	},

	// Query para obtener stock crítico
	getCriticalStock_query: (threshold = 10) => {
		return `
			SELECT 
				a.cod_articulo AS id,
				a.descrip_arti AS description,
				a.cant_stock AS stock,
				a.UM AS unit_measure,
				i.precio_vta AS price
			FROM articulos a
			JOIN listas_items i ON a.cod_articulo = i.articulo
			WHERE a.cant_stock <= ${threshold}
				AND a.cant_stock >= 0
				AND a.activo = 'S'
				AND i.lista_codi = '2'
			ORDER BY a.cant_stock ASC
		`;
	},

	// Query para obtener artículos por categoría
	getArticlesByCategory_query: (categoryId, listCode = "2") => {
		return `
			SELECT 
				a.cod_articulo AS id,
				a.descrip_arti AS description,
				i.precio_vta AS price,
				a.cant_stock AS stock,
				ag.descrip_agru AS category_description
			FROM articulos a
			JOIN listas_items i ON a.cod_articulo = i.articulo
			JOIN agrupaciones ag ON a.agru_2 = ag.codi_agru
			WHERE a.agru_1 = '${categoryId}'
				AND a.activo = 'S'
				AND i.lista_codi = '${listCode}'
				AND ag.descrip_agru <> 'AGRUPACION PRUEBA'
				AND ag.descrip_agru <> 'OFERTAS FRAM'
			ORDER BY ag.descrip_agru ASC, a.cod_articulo ASC
		`;
	},
};

module.exports = { queries };
