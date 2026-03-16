# Credenciales Firestore para Backend - Colección `ingreso_a_listas`

## 1. Información del Proyecto Firebase

| Campo | Valor |
|-------|-------|
| **Project ID** | `renova-errores-2` |
| **Auth Domain** | `renova-errores-2.firebaseapp.com` |
| **Storage Bucket** | `renova-errores-2.appspot.com` |

---

## 2. Credenciales para Backend (Firebase Admin SDK)

Para que tu backend escriba en Firestore debes usar **Firebase Admin SDK** con una **Service Account**. En el proyecto `renova-order-manager` existe el archivo:

```
firebase-service-account.json
```

### Estructura del archivo de credenciales

El JSON contiene los siguientes campos:

```json
{
  "type": "service_account",
  "project_id": "renova-errores-2",
  "private_key_id": "<tu-private-key-id>",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-10x1w@renova-errores-2.iam.gserviceaccount.com",
  "client_id": "103142736564661784073",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-10x1w%40renova-errores-2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### Variables de entorno (alternativa)

| Variable | Descripción |
|----------|-------------|
| `FIREBASE_PROJECT_ID` | `renova-errores-2` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-10x1w@renova-errores-2.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | La clave privada completa (incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`). En algunos entornos hay que reemplazar `\n` por saltos de línea reales. |
| `FIREBASE_PRIVATE_KEY_ID` | ID de la clave privada |

---

## 3. Colección objetivo

| Campo | Valor |
|-------|-------|
| **Nombre de la colección** | `ingreso_a_listas` |
| **Base de datos** | `(default)` |

---

## 4. Esquema esperado de documentos

Según el uso en `WebAnalytics.js`, cada documento en `ingreso_a_listas` debe tener:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Client` o `client` | string | Nombre o identificador del cliente |
| `fecha` | Timestamp / Date | Fecha y hora del ingreso |
| `listCode` o `list_code` | string | Código de la lista |
| `tipo` | string | Tipo de ingreso |

### Ejemplo de documento

```json
{
  "Client": "Nombre del cliente",
  "fecha": "<Firestore Timestamp>",
  "listCode": "LISTA-001",
  "tipo": "manual"
}
```

---

## 5. Ejemplo de inicialización en Node.js

```javascript
const admin = require('firebase-admin');

// Opción A: Archivo JSON
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// Opción B: Variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

// Escribir en ingreso_a_listas
await db.collection('ingreso_a_listas').add({
  Client: 'Mi Cliente',
  fecha: admin.firestore.Timestamp.now(),
  listCode: 'LISTA-001',
  tipo: 'webhook',
});
```

---

## 6. Reglas de Firestore

Las reglas actuales (`firestore.rules`) deniegan lectura y escritura para clientes normales. El **Admin SDK** ignora estas reglas y tiene acceso completo, así que tu backend podrá escribir sin problemas.

---

## 7. Seguridad

1. **No subas** el archivo `firebase-service-account.json` a repositorios públicos.
2. Añade `firebase-service-account.json` a `.gitignore` en tu proyecto backend.
3. En producción, usa variables de entorno en lugar del archivo.
4. Si el archivo ya fue expuesto en un repo público, **rota la clave** en [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts?project=renova-errores-2).

---

## 8. Dependencia necesaria

```bash
npm install firebase-admin
# o
yarn add firebase-admin
```
