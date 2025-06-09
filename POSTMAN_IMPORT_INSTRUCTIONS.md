# 📮 Instrucciones para Importar en Postman

## 📁 Archivos Incluidos

- `Renova_API_v2.postman_collection.json` - Colección principal con todos los endpoints
- `Renova_API_v2.postman_environment.json` - Variables de entorno para desarrollo local
- `Renova_API_v2_Production.postman_environment.json` - Variables de entorno para producción

## 🚀 Paso a Paso

### 1. Importar la Colección

1. **Abrir Postman**
2. **Clic en "Import"** (botón superior izquierdo)
3. **Seleccionar "Upload Files"** o arrastrar el archivo
4. **Seleccionar el archivo:** `Renova_API_v2.postman_collection.json`
5. **Clic en "Import"**

### 2. Importar los Entornos

1. **Clic en el ícono de engranaje** ⚙️ (Manage Environments)
2. **Clic en "Import"**
3. **Seleccionar archivos:**
   - `Renova_API_v2.postman_environment.json`
   - `Renova_API_v2_Production.postman_environment.json`
4. **Clic en "Import"**

### 3. Configurar el Entorno Activo

1. **En el dropdown superior derecho** seleccionar:
   - `Renova API v2 - Local` para desarrollo
   - `Renova API v2 - Production` para producción

## 📋 Estructura de la Colección

### 🔍 **API Info & Health**

- ✅ **API Info** - `GET /api/info`
- ❤️ **Health Check** - `GET /api/health`

### 🔄 **Legacy Endpoints**

_(Mantener compatibilidad - NO modificar)_

#### **Listas y Detalles**

- 📋 Obtener Listas Principales - `GET /`
- 📄 Detalle de Lista - `GET /lista/:id`
- 📦 Listado de Artículos - `GET /listado-articulos`

#### **Ofertas**

- 🎁 Ofertas Kits - `GET /ofertas-kits`
- 🏷️ Ofertas Fram - `GET /ofertas-fram`
- 💰 Ofertas Valvoline - `GET /ofertas-valvoline`
- _(y todas las demás ofertas)_

#### **Stock**

- ⚠️ Stock Crítico - `GET /stock-critico`
- ❌ Stock Negativo - `GET /stock-negativo`
- 📊 Stock by UM - `GET /stock-by-um`

#### **Autenticación**

- 🔐 Validar Usuario - `POST /validate-user`
- 🔑 Validación General - `POST /general-validate-user`

### 🆕 **Articles API (REST)**

- 🔍 Obtener Artículo por ID - `GET /api/articles/:id`
- ❌ Stock Negativo - `GET /api/articles/stock/negative`

### 👥 **Clients API (REST)**

- 💸 Obtener Descuento - `GET /api/clients/:clientNumber/discount`

## ⚙️ Variables de Entorno

### **Variables Configurables:**

| Variable          | Descripción                 | Local                   | Producción                |
| ----------------- | --------------------------- | ----------------------- | ------------------------- |
| `baseUrl`         | URL base de la API          | `http://localhost:5555` | `https://your-domain.com` |
| `testClientId`    | ID de cliente para pruebas  | `12345`                 | _(configurar)_            |
| `testArticleId`   | ID de artículo para pruebas | `ABC123`                | _(configurar)_            |
| `testCuit`        | CUIT para autenticación     | `20123456789`           | _(configurar)_            |
| `defaultListCode` | Código de lista por defecto | `2`                     | `2`                       |

## 🧪 Pruebas Rápidas

### **Verificar que la API funciona:**

1. ✅ **Health Check** - Debe retornar `200 OK`
2. 📊 **API Info** - Debe retornar información de la API

### **Probar endpoints legacy:**

1. 📋 **Listas Principales** - `GET /`
2. 👥 **Listado Clientes** - `GET /clientes`

### **Probar nuevas APIs:**

1. ❌ **Stock Negativo** - `GET /api/articles/stock/negative`
2. 🔍 **Artículo por ID** - `GET /api/articles/{{testArticleId}}`

## 🔧 Personalización

### **Para diferentes entornos:**

1. **Duplicar el entorno local**
2. **Cambiar variables según sea necesario:**
   - `baseUrl` para apuntar a diferentes servidores
   - `testClientId` / `testArticleId` para datos específicos del entorno

### **Para agregar autenticación:**

1. **Editar el entorno**
2. **Agregar variables como:**
   - `apiKey`
   - `authToken`
   - `username` / `password`

## 📝 Notas Importantes

- ⚠️ **No modificar rutas legacy** sin coordinación del equipo
- 🔄 **Las variables se actualizan automáticamente** en todos los requests
- 📋 **Usar la documentación** incluida en cada request de Postman
- 🧪 **Probar en local** antes de usar en producción

## 🆘 Troubleshooting

### **La colección no carga:**

- Verificar que el archivo JSON es válido
- Intentar importar desde URL si es necesario

### **Los requests fallan:**

- Verificar que el servidor está corriendo
- Comprobar las variables de entorno
- Verificar la URL base en el entorno activo

### **Variables no se reemplazan:**

- Asegurarse de tener un entorno seleccionado
- Verificar que las variables están definidas
- Usar la sintaxis `{{variableName}}` correctamente
