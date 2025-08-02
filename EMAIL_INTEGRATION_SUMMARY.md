# Integración de Email en createReconocimiento

## Resumen de Cambios

Se ha integrado exitosamente la funcionalidad de envío de emails en la función `createReconocimiento` del servicio de reconocimientos. Los cambios incluyen:

### 1. Modificaciones en `app/Services/reconocimiento.service.js`

- **Importaciones agregadas**:
  - `personaService` para consultar información de la persona
  - `certTypeService` para consultar información del tipo de certificado
  - `sendRecognitionEmail` de `SG.service.js`

- **Lógica agregada**:
  - Consulta automática de la información de la persona (nombre y rol) usando el email
  - Consulta automática de la información del tipo de certificado usando el cert_type_id
  - Envío automático de email usando SendGrid
  - Manejo de errores que no interrumpe la creación del reconocimiento

### 2. Conversión de `app/Services/SG.service.js`

- Convertido de ES modules (import/export) a CommonJS (require/module.exports)
- Mantiene la misma funcionalidad de envío de emails

### 3. Actualización de `app/Controllers/reconocimiento.controller.js`

- Eliminada importación innecesaria de AWS SDK
- Mejorado el logging para incluir información del email enviado
- Actualizada la respuesta para indicar que el email fue enviado

### 4. Actualización de `API_DOCUMENTATION.md`

- Documentación actualizada para reflejar la nueva funcionalidad de email
- Agregadas notas sobre el comportamiento automático del sistema

### 5. Tests (`__tests__/reconocimiento.test.js`)

- Creados tests completos para verificar la funcionalidad
- Tests cubren casos exitosos y de error
- Verificación de que el reconocimiento se crea incluso si el email falla

## Flujo de Funcionamiento

1. **Recepción de datos**: Se reciben `email_persona`, `cert_type_id`, y `meeting`
2. **Creación del reconocimiento**: Se inserta en la base de datos
3. **Consulta de información**:
   - Se consulta la tabla `persona` para obtener `full_name` y `role`
   - Se consulta la tabla `cert_type` para obtener `nombre`
4. **Envío de email**: Se llama a `sendRecognitionEmail` con todos los datos necesarios
5. **Respuesta**: Se retorna el reconocimiento creado con mensaje de confirmación

## Parámetros del Email

El email se envía con los siguientes parámetros:
- `to`: Email de la persona (del body)
- `userName`: Nombre completo de la persona (consultado en tabla persona)
- `certType`: Nombre del certificado (consultado en tabla cert_type)
- `userRole`: Rol de la persona (consultado en tabla persona)
- `issueDate`: Fecha actual en formato YYYY-MM-DD
- `expiryDate`: null (sin fecha de expiración)
- `ctaUrl`: null (sin URL de CTA)
- `currentYear`: Año actual

## Manejo de Errores

- **Si la persona no existe**: Se lanza error y no se crea el reconocimiento
- **Si el tipo de certificado no existe**: Se lanza error y no se crea el reconocimiento
- **Si el email falla**: Se crea el reconocimiento pero se registra el error en logs

## Variables de Entorno Requeridas

Para que el email funcione correctamente, se necesitan las siguientes variables de entorno:
- `AWS_REGION`: Región de AWS (por defecto: "us-east-1")
- `AWS_ACCESS_KEY_ID`: Access Key de AWS
- `AWS_SECRET_ACCESS_KEY`: Secret Access Key de AWS

## Plantilla de Email

El sistema utiliza la plantilla configurada en SendGrid con template ID.

## Tests

Los tests verifican:
- ✅ Creación exitosa con envío de email
- ✅ Creación exitosa aunque falle el email
- ✅ Error si no existe la persona
- ✅ Error si no existe el tipo de certificado

Todos los tests pasan correctamente. 