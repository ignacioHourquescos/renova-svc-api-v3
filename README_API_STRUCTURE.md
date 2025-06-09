# 🚀 Renova API v2 - Estructura Organizada

## 📁 Estructura del Proyecto

```
renova-api-v2/
├── config/
│   └── conexionbd.js         # Configuración de base de datos
├── controller/
│   ├── _legacy/              # Controladores legacy (NO MODIFICAR)
│   │   ├── controller.js
│   │   ├── controller-xref.js
│   │   ├── controller-renovapp-clients.js
│   │   └── cobranzas.js
│   ├── article/              # Controladores de artículos (NUEVOS)
│   │   ├── article-controller.js
│   │   └── article-queries.js
│   └── client/               # Controladores de clientes (NUEVOS)
│       ├── client-controller.js
│       └── client-queries.js
├── routes/
│   ├── index.js              # Router principal
│   ├── legacy.js             # Rutas legacy (MANTENER INTACTAS)
│   ├── articles.js           # Rutas REST de artículos
│   └── clients.js            # Rutas REST de clientes
└── server.js                 # Servidor principal
```

## 🔗 Endpoints Disponibles

### 📊 API Info & Health

- `GET /api/info` - Información de la API
- `GET /api/health` - Estado de la API

### 🔄 Legacy Endpoints (MANTENER INTACTAS)

**⚠️ IMPORTANTE: Estas rutas NO deben modificarse por compatibilidad**

```
GET /                           # Obtener listas principales
GET /lista/:id                  # Detalle de lista específica
GET /ofertas-kits              # Ofertas de kits
GET /ofertas-fram              # Ofertas Fram
GET /stock-negativo            # Stock negativo
GET /clientes                  # Listado de clientes
GET /validate-user             # Validación de usuario
... (todas las rutas existentes)
```

### 🆕 Nuevas APIs REST

#### 📦 Artículos

```bash
# Obtener artículo por ID
GET /api/articles/:id?listCode=2

# Obtener stock negativo
GET /api/articles/stock/negative

# Ejemplos:
curl http://localhost:5555/api/articles/ABC123
curl http://localhost:5555/api/articles/stock/negative
```

#### 👥 Clientes

```bash
# Obtener descuento de cliente
GET /api/clients/:clientNumber/discount

# Ejemplo:
curl http://localhost:5555/api/clients/12345/discount
```

## 🏗️ Arquitectura

### Principios de Organización

1. **Legacy First**: Las rutas legacy se mantienen sin prefijo para compatibilidad total
2. **REST Convention**: Las nuevas APIs siguen convenciones REST con prefijo `/api/`
3. **Modularidad**: Cada entidad tiene su propio controlador y rutas
4. **Escalabilidad**: Fácil agregar nuevas entidades y endpoints

### Flujo de Rutas

```
server.js
    ↓
routes/index.js (router principal)
    ↓
├── routes/legacy.js     → controller/_legacy/*
├── routes/articles.js   → controller/article/*
└── routes/clients.js    → controller/client/*
```

## 🚦 Convenciones

### Estructura de Controladores

```javascript
// controller/[entity]/[entity]-controller.js
const con = require("../../config/conexionbd");
const { queries } = require("./{entity}-queries");

function getFunctionName(req, res) {
	// Lógica del controlador
}

module.exports = {
	getFunctionName,
};
```

### Estructura de Queries

```javascript
// controller/[entity]/[entity]-queries.js
const queries = {
	getEntity_query: (param) => {
		return `SELECT ... WHERE param = '${param}'`;
	},
};

module.exports = { queries };
```

### Estructura de Rutas

```javascript
// routes/[entity].js
const express = require("express");
const router = express.Router();
const entityController = require("../controller/entity/entity-controller");

router.get("/:id", entityController.getById);

module.exports = router;
```

## 🔮 Roadmap de Funcionalidades

### Artículos (Próximas funciones)

- [ ] `GET /api/articles` - Listar todos los artículos
- [ ] `GET /api/articles/search?q=term` - Búsqueda de artículos
- [ ] `GET /api/articles/categories` - Listar categorías
- [ ] `GET /api/articles/stock/critical` - Stock crítico
- [ ] `POST /api/articles` - Crear artículo
- [ ] `PUT /api/articles/:id` - Actualizar artículo

### Clientes (Próximas funciones)

- [ ] `GET /api/clients` - Listar clientes
- [ ] `GET /api/clients/:id` - Cliente por ID
- [ ] `GET /api/clients/search?q=term` - Búsqueda de clientes
- [ ] `GET /api/clients/:id/vouchers` - Comprobantes del cliente
- [ ] `POST /api/clients/authenticate` - Autenticación de cliente

## 🔧 Desarrollo

### Agregar Nueva Entidad

1. **Crear controlador**: `controller/nueva-entidad/nueva-entidad-controller.js`
2. **Crear queries**: `controller/nueva-entidad/nueva-entidad-queries.js`
3. **Crear rutas**: `routes/nueva-entidad.js`
4. **Registrar en index**: Agregar en `routes/index.js`

### Ejemplo: Agregar "Orders"

```javascript
// routes/index.js
const orderRoutes = require("./orders");
router.use("/api/orders", orderRoutes);
```

## 🚨 Reglas Importantes

1. **NO MODIFICAR** rutas legacy sin coordinación del equipo
2. **SIEMPRE** usar el prefijo `/api/` para nuevas funcionalidades
3. **MANTENER** la estructura modular por entidades
4. **DOCUMENTAR** cualquier cambio en este README
5. **PROBAR** que las rutas legacy siguen funcionando después de cambios

## 🧪 Testing

```bash
# Verificar que el servidor arranca
node server.js

# Probar rutas legacy (deben seguir funcionando)
curl http://localhost:5555/
curl http://localhost:5555/clientes

# Probar nuevas APIs
curl http://localhost:5555/api/info
curl http://localhost:5555/api/health
curl http://localhost:5555/api/articles/stock/negative
```
