# Despliegue en Render

Este documento explica cómo desplegar la API de Renova en Render.com.

## Requisitos previos

1. Tener una cuenta en [Render](https://render.com/)
2. Tener acceso al repositorio de GitLab: https://gitlab.com/renova-reloaded/svc-api-v3.git

## Pasos para el despliegue

### 1. Conectar el repositorio a Render

1. Inicia sesión en tu cuenta de Render
2. Ve a la sección "Dashboard" y haz clic en "New +"
3. Selecciona "Web Service"
4. Conecta tu cuenta de GitLab si aún no lo has hecho
5. Busca y selecciona el repositorio `renova-reloaded/svc-api-v3`

### 2. Configurar el servicio

Render detectará automáticamente la configuración en el archivo `render.yaml`, pero puedes verificar estos ajustes:

- **Nombre**: renova-api-v2
- **Runtime**: Node
- **Plan**: Free
- **Comando de construcción**: npm install
- **Comando de inicio**: npm start

### 3. Configurar variables de entorno

Es necesario configurar las siguientes variables de entorno:

- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos

Estas variables no están incluidas en el archivo `render.yaml` por seguridad y deben ser configuradas manualmente en el panel de Render.

### 4. Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Una vez completado, podrás acceder a tu API a través de la URL proporcionada por Render

## Solución de problemas

Si encuentras algún problema durante el despliegue, verifica:

1. Que las variables de entorno estén correctamente configuradas
2. Que el puerto configurado en la aplicación coincida con el puerto que Render espera (la variable PORT)
3. Los logs de la aplicación para identificar posibles errores

## Actualizaciones

Para actualizar la aplicación, simplemente haz push de tus cambios al repositorio de GitLab. Render detectará los cambios y desplegará automáticamente la nueva versión.
