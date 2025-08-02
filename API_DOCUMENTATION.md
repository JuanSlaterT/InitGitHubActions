# API Documentation - Persona, Tipos de Certificado y Reconocimiento

## 📋 Descripción General

Esta documentación describe las APIs para gestionar personas, tipos de certificado y reconocimientos en el sistema. Las APIs están disponibles bajo el prefijo `/api/`.

## 🏗️ Estructura de Base de Datos


### Tabla: `persona`
```sql
CREATE TABLE persona (
    email       VARCHAR(64)  PRIMARY KEY,
    full_name   VARCHAR(64)  NOT NULL,
    url_image   VARCHAR(128) NOT NULL,
    team        VARCHAR(24)  NOT NULL,
    role        VARCHAR(32)  NOT NULL,
    is_admin    BOOLEAN      DEFAULT FALSE,
    is_enabled  BOOLEAN      DEFAULT FALSE,
    created_at  TIMESTAMPTZ  DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  DEFAULT NOW()
);
```

### Tabla: `cert_type`
```sql
CREATE TABLE cert_type (
    id          INTEGER       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo        VARCHAR(24)   NOT NULL,
    nombre      VARCHAR(64)   NOT NULL,
    created_at  TIMESTAMPTZ   DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   DEFAULT NOW()
);
```

### Tabla: `reconocimiento`
```sql
CREATE TABLE reconocimiento (
    id              INTEGER       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email_persona   VARCHAR(64)   NOT NULL,
    cert_type_id    INTEGER       NOT NULL,
    meeting         VARCHAR(64)   NOT NULL,
    created_at      TIMESTAMPTZ   DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   DEFAULT NOW(),

    CONSTRAINT fk_recon_persona
        FOREIGN KEY (email_persona)
        REFERENCES persona(email)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_recon_cert_type
        FOREIGN KEY (cert_type_id)
        REFERENCES cert_type(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
```

## 👥 APIs de Persona

### Base URL: `/api/persona`

#### 1. Crear Persona
- **POST** `/api/persona`
- **Descripción**: Crea una nueva persona en el sistema
- **Body**:
```json
{
    "email": "usuario@ejemplo.com",
    "full_name": "Juan Pérez",
    "url_image": "https://ejemplo.com/imagen.jpg",
    "team": "Desarrollo",
    "role": "Desarrollador",
    "is_admin": false,
    "is_enabled": true
}
```
- **Respuesta Exitosa** (201):
```json
{
    "result": {
        "email": "usuario@ejemplo.com",
        "full_name": "Juan Pérez",
        "url_image": "https://ejemplo.com/imagen.jpg",
        "team": "Desarrollo",
        "role": "Desarrollador",
        "is_admin": false,
        "is_enabled": true,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```
- **Notas**:
  - `is_admin`: Indica si la persona es administrador (por defecto: false)
  - `is_enabled`: Indica si la persona está habilitada (por defecto: true)
  - Al crear una persona, se envía automáticamente un email de solicitud de aprobación a todos los administradores habilitados

#### 2. Obtener Todas las Personas
- **GET** `/api/persona`
- **Descripción**: Obtiene la lista de todas las personas
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "email": "usuario1@ejemplo.com",
            "full_name": "Juan Pérez",
            "url_image": "https://ejemplo.com/imagen1.jpg",
            "team": "Desarrollo",
            "role": "Desarrollador",
            "is_admin": false,
            "is_enabled": true,
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z"
        },
        {
            "email": "usuario2@ejemplo.com",
            "full_name": "María García",
            "url_image": "https://ejemplo.com/imagen2.jpg",
            "team": "Diseño",
            "role": "Diseñadora",
            "is_admin": true,
            "is_enabled": true,
            "created_at": "2024-01-15T11:00:00Z",
            "updated_at": "2024-01-15T11:00:00Z"
        }
    ]
}
```

#### 3. Obtener Persona por Email
- **GET** `/api/persona/{email}`
- **Descripción**: Obtiene una persona específica por su email
- **Parámetros**: `email` (string, formato email)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "email": "usuario@ejemplo.com",
        "full_name": "Juan Pérez",
        "url_image": "https://ejemplo.com/imagen.jpg",
        "team": "Desarrollo",
        "role": "Desarrollador",
        "is_admin": false,
        "is_enabled": true,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```
- **Respuesta Error** (404):
```json
{
    "error": "Persona no encontrada",
    "message": "No se encontró una persona con el email: usuario@ejemplo.com"
}
```

#### 4. Actualizar Persona
- **PUT** `/api/persona/{email}`
- **Descripción**: Actualiza los datos de una persona existente
- **Parámetros**: `email` (string, formato email)
- **Body**:
```json
{
    "full_name": "Juan Carlos Pérez",
    "url_image": "https://ejemplo.com/nueva-imagen.jpg",
    "team": "Desarrollo Senior",
    "role": "Desarrollador Senior",
    "is_admin": false,
    "is_enabled": true
}
```
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "email": "usuario@ejemplo.com",
        "full_name": "Juan Carlos Pérez",
        "url_image": "https://ejemplo.com/nueva-imagen.jpg",
        "team": "Desarrollo Senior",
        "role": "Desarrollador Senior",
        "is_admin": false,
        "is_enabled": true,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T12:00:00Z"
    }
}
```

#### 5. Eliminar Persona
- **DELETE** `/api/persona/{email}`
- **Descripción**: Elimina una persona del sistema (también elimina sus reconocimientos por CASCADE)
- **Parámetros**: `email` (string, formato email)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "email": "usuario@ejemplo.com",
        "full_name": "Juan Pérez",
        "url_image": "https://ejemplo.com/imagen.jpg",
        "team": "Desarrollo",
        "role": "Desarrollador",
        "is_admin": false,
        "is_enabled": true,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    },
    "message": "Persona eliminada exitosamente"
}
```

## 🏷️ APIs de Tipos de Certificado

### Base URL: `/api/cert-type`

#### 1. Crear Tipo de Certificado
- **POST** `/api/cert-type`
- **Descripción**: Crea un nuevo tipo de certificado
- **Body**:
```json
{
    "tipo": "KUDOS",
    "nombre": "Reconocimiento por colaboración"
}
```
- **Respuesta Exitosa** (201):
```json
{
    "result": {
        "id": 1,
        "tipo": "KUDOS",
        "nombre": "Reconocimiento por colaboración",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```

#### 2. Obtener Todos los Tipos de Certificado
- **GET** `/api/cert-type`
- **Descripción**: Obtiene la lista de todos los tipos de certificado
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "tipo": "KUDOS",
            "nombre": "Reconocimiento por colaboración",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z"
        },
        {
            "id": 2,
            "tipo": "ACHIEVEMENT",
            "nombre": "Logro destacado del sprint",
            "created_at": "2024-01-15T10:35:00Z",
            "updated_at": "2024-01-15T10:35:00Z"
        },
        {
            "id": 3,
            "tipo": "THANKYOU",
            "nombre": "Agradecimiento especial",
            "created_at": "2024-01-15T10:40:00Z",
            "updated_at": "2024-01-15T10:40:00Z"
        }
    ]
}
```

#### 3. Obtener Tipo de Certificado por ID
- **GET** `/api/cert-type/{id}`
- **Descripción**: Obtiene un tipo de certificado específico por su ID
- **Parámetros**: `id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "tipo": "KUDOS",
        "nombre": "Reconocimiento por colaboración",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```

#### 4. Obtener Tipo de Certificado por Tipo
- **GET** `/api/cert-type/tipo/{tipo}`
- **Descripción**: Obtiene un tipo de certificado por su código de tipo
- **Parámetros**: `tipo` (string, ej: KUDOS, ACHIEVEMENT, THANKYOU)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "tipo": "KUDOS",
        "nombre": "Reconocimiento por colaboración",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```

#### 5. Actualizar Tipo de Certificado
- **PUT** `/api/cert-type/{id}`
- **Descripción**: Actualiza un tipo de certificado existente
- **Parámetros**: `id` (integer)
- **Body**:
```json
{
    "tipo": "KUDOS_PLUS",
    "nombre": "Reconocimiento especial por colaboración"
}
```
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "tipo": "KUDOS_PLUS",
        "nombre": "Reconocimiento especial por colaboración",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T12:00:00Z"
    }
}
```

#### 6. Eliminar Tipo de Certificado
- **DELETE** `/api/cert-type/{id}`
- **Descripción**: Elimina un tipo de certificado (solo si no está siendo usado en reconocimientos)
- **Parámetros**: `id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 4,
        "tipo": "TEST",
        "nombre": "Tipo de prueba",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    },
    "message": "Tipo de certificado eliminado exitosamente"
}
```
- **Respuesta Error** (409):
```json
{
    "error": "No se puede eliminar",
    "message": "El tipo de certificado está siendo usado en reconocimientos"
}
```

## 🏆 APIs de Reconocimiento

### Base URL: `/api/reconocimiento`

#### 1. Crear Reconocimiento
- **POST** `/api/reconocimiento`
- **Descripción**: Crea un nuevo reconocimiento para una persona y envía un email de notificación automáticamente
- **Body**:
```json
{
    "email_persona": "usuario@ejemplo.com",
    "cert_type_id": 1,
    "meeting": "Reunión Mensual Enero"
}
```
- **Respuesta Exitosa** (201):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "cert_type_id": 1,
        "meeting": "Reunión Mensual Enero",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    },
    "message": "Reconocimiento creado exitosamente y email enviado"
}
```
- **Notas**:
  - El sistema automáticamente consulta la información de la persona (nombre y rol) en la tabla `persona`
  - El sistema consulta la información del tipo de certificado en la tabla `cert_type`
  - Se envía un email de reconocimiento usando SendGrid con la plantilla configurada
  - Si el envío del email falla, el reconocimiento se crea igualmente pero se registra el error en los logs

#### 2. Obtener Todos los Reconocimientos
- **GET** `/api/reconocimiento`
- **Descripción**: Obtiene todos los reconocimientos con información completa de persona y tipo de certificado
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "cert_type_id": 1,
            "meeting": "Reunión Mensual Enero",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador",
            "cert_type_tipo": "KUDOS",
            "cert_type_nombre": "Reconocimiento por colaboración"
        }
    ]
}
```

#### 3. Obtener Reconocimiento por ID
- **GET** `/api/reconocimiento/{id}`
- **Descripción**: Obtiene un reconocimiento específico por su ID
- **Parámetros**: `id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "cert_type_id": 1,
        "meeting": "Reunión Mensual Enero",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z",
        "full_name": "Juan Pérez",
        "team": "Desarrollo",
        "role": "Desarrollador",
        "cert_type_tipo": "KUDOS",
        "cert_type_nombre": "Reconocimiento por colaboración"
    }
}
```

#### 4. Obtener Reconocimientos por Email
- **GET** `/api/reconocimiento/email/{email}`
- **Descripción**: Obtiene todos los reconocimientos de una persona específica
- **Parámetros**: `email` (string, formato email)
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "cert_type_id": 1,
            "meeting": "Reunión Mensual Enero",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador",
            "cert_type_tipo": "KUDOS",
            "cert_type_nombre": "Reconocimiento por colaboración"
        }
    ]
}
```

#### 5. Obtener Reconocimientos por ID de Tipo de Certificado
- **GET** `/api/reconocimiento/cert-type/{cert_type_id}`
- **Descripción**: Obtiene todos los reconocimientos de un tipo de certificado específico
- **Parámetros**: `cert_type_id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "cert_type_id": 1,
            "meeting": "Reunión Mensual Enero",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador",
            "cert_type_tipo": "KUDOS",
            "cert_type_nombre": "Reconocimiento por colaboración"
        }
    ]
}
```

#### 6. Obtener Reconocimientos por Tipo de Certificado
- **GET** `/api/reconocimiento/tipo/{tipo}`
- **Descripción**: Obtiene todos los reconocimientos de un tipo específico (ej: KUDOS, ACHIEVEMENT)
- **Parámetros**: `tipo` (string)
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "cert_type_id": 1,
            "meeting": "Reunión Mensual Enero",
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador",
            "cert_type_tipo": "KUDOS",
            "cert_type_nombre": "Reconocimiento por colaboración"
        }
    ]
}
```

#### 7. Obtener Estadísticas
- **GET** `/api/reconocimiento/stats`
- **Descripción**: Obtiene estadísticas detalladas de reconocimientos
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "total_reconocimientos": "10",
            "personas_con_reconocimientos": "8",
            "tipo": "KUDOS",
            "nombre": "Reconocimiento por colaboración",
            "count_by_type": "5"
        },
        {
            "total_reconocimientos": "10",
            "personas_con_reconocimientos": "8",
            "tipo": "ACHIEVEMENT",
            "nombre": "Logro destacado del sprint",
            "count_by_type": "3"
        },
        {
            "total_reconocimientos": "10",
            "personas_con_reconocimientos": "8",
            "tipo": "THANKYOU",
            "nombre": "Agradecimiento especial",
            "count_by_type": "2"
        }
    ]
}
```

#### 8. Actualizar Reconocimiento
- **PUT** `/api/reconocimiento/{id}`
- **Descripción**: Actualiza un reconocimiento existente
- **Parámetros**: `id` (integer)
- **Body**:
```json
{
    "email_persona": "usuario@ejemplo.com",
    "cert_type_id": 2,
    "meeting": "Reunión Mensual Enero Actualizada"
}
```
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "cert_type_id": 2,
        "meeting": "Reunión Mensual Enero Actualizada",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T12:00:00Z"
    }
}
```

#### 9. Eliminar Reconocimiento
- **DELETE** `/api/reconocimiento/{id}`
- **Descripción**: Elimina un reconocimiento específico
- **Parámetros**: `id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "cert_type_id": 1,
        "meeting": "Reunión Mensual Enero",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    },
    "message": "Reconocimiento eliminado exitosamente"
}
```

## 🔗 APIs de LinkedIn

### Base URL: `/api/linkedin`

#### 1. Obtener Datos de LinkedIn
- **GET** `/api/linkedin`
- **Descripción**: Obtiene información de LinkedIn del usuario autenticado
- **Headers**: Requiere headers de autenticación de LinkedIn
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": "linkedin_user_id",
        "firstName": "Juan",
        "lastName": "Pérez",
        "profilePicture": "https://linkedin.com/profile.jpg",
        "email": "juan.perez@linkedin.com"
    }
}
```

#### 2. Callback de LinkedIn
- **GET** `/api/linkedin/getLinkedin`
- **Descripción**: Endpoint de callback para la autenticación OAuth de LinkedIn
- **Parámetros**: `code` (string, código de autorización de LinkedIn)
- **Respuesta Exitosa** (200):
```json
{
    "success": true,
    "redirectUrl": "https://www.linkedin.com/in/me/edit/forms/certification/new/?certId=POC-1234567890&certUrl=https://mi-app-poc.com/verify/POC-1234567890&isFromA2p=true&issueMonth=1&issueYear=2024&name=Certificado POC",
    "user": {
        "name": "Juan Pérez",
        "email": "juan.perez@linkedin.com"
    },
    "cert": {
        "name": "Certificado POC",
        "id": "POC-1234567890",
        "url": "https://mi-app-poc.com/verify/POC-1234567890",
        "issuer": "Mi Compañía de Prueba",
        "issueMonth": 1,
        "issueYear": 2024
    }
}
```

## 📧 Funcionalidad de Email

### Email de Reconocimiento
Cuando se crea un reconocimiento, el sistema automáticamente:
1. Consulta la información de la persona en la tabla `persona`
2. Consulta la información del tipo de certificado en la tabla `cert_type`
3. Envía un email de reconocimiento usando SendGrid
4. Utiliza la plantilla `email_reconocimiento_template`

### Email de Solicitud de Aprobación
Cuando se crea una nueva persona, el sistema automáticamente:
1. Envía un email de solicitud de aprobación a todos los administradores habilitados
2. Utiliza la plantilla `email_approval_request_template`

### Variables de Entorno Requeridas para Email
- `AWS_REGION`: Región de AWS (por defecto: "us-east-1")
- `AWS_ACCESS_KEY_ID`: Access Key de AWS
- `AWS_SECRET_ACCESS_KEY`: Secret Access Key de AWS
- `LINKEDIN_CLIENT_ID`: Client ID de la aplicación de LinkedIn
- `LINKEDIN_CLIENT_SECRET`: Client Secret de la aplicación de LinkedIn
- `LINKEDIN_REDIRECT_URI`: URI de redirección para OAuth de LinkedIn

## 🔧 Códigos de Estado HTTP

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Conflicto (ej: email duplicado, tipo en uso)
- **500**: Internal Server Error - Error interno del servidor

## 📝 Ejemplos de Uso

### Ejemplo 1: Crear un tipo de certificado, persona y reconocimiento

```bash
# 1. Crear tipo de certificado
curl -X POST http://localhost:3000/api/cert-type \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "KUDOS",
    "nombre": "Reconocimiento por colaboración"
  }'

# 2. Crear persona
curl -X POST http://localhost:3000/api/persona \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@empresa.com",
    "full_name": "Juan Pérez",
    "url_image": "https://empresa.com/fotos/juan.jpg",
    "team": "Desarrollo",
    "role": "Desarrollador Senior"
  }'

# 3. Crear reconocimiento
curl -X POST http://localhost:3000/api/reconocimiento \
  -H "Content-Type: application/json" \
  -d '{
    "email_persona": "juan.perez@empresa.com",
    "cert_type_id": 1,
    "meeting": "Reunión Mensual Enero 2024"
  }'
```

### Ejemplo 2: Obtener todos los tipos de certificado

```bash
curl -X GET http://localhost:3000/api/cert-type
```

### Ejemplo 3: Obtener reconocimientos por tipo

```bash
curl -X GET http://localhost:3000/api/reconocimiento/tipo/KUDOS
```

### Ejemplo 4: Obtener estadísticas de reconocimientos

```bash
curl -X GET http://localhost:3000/api/reconocimiento/stats
```

## 🚀 Notas Importantes

1. **Validación de Email**: El email debe ser único en la tabla `persona`
2. **Integridad Referencial**: Los reconocimientos están vinculados a personas y tipos de certificado
3. **Cascade Delete**: Al eliminar una persona, se eliminan automáticamente todos sus reconocimientos
4. **Restrict Delete**: No se pueden eliminar tipos de certificado que estén siendo usados en reconocimientos
5. **JOIN Automático**: Las consultas de reconocimientos incluyen automáticamente los datos de la persona y tipo de certificado
6. **Logging**: Todas las operaciones se registran en los logs del sistema
7. **Documentación Swagger**: Las APIs están documentadas en Swagger en `/doc`
8. **Timestamps**: Todas las tablas incluyen timestamps automáticos para auditoría
9. **Email Automático**: Al crear reconocimientos se envía automáticamente un email de notificación
10. **Solicitud de Aprobación**: Al crear personas se envía automáticamente un email de solicitud de aprobación a los administradores
11. **Campos de Administración**: La tabla `persona` incluye campos `is_admin` e `is_enabled` para gestión de permisos
12. **Integración LinkedIn**: Disponible para autenticación OAuth y generación de URLs de certificación

## 🔍 Endpoints Disponibles

### Persona
- `POST /api/persona` - Crear persona
- `GET /api/persona` - Obtener todas las personas
- `GET /api/persona/{email}` - Obtener persona por email
- `PUT /api/persona/{email}` - Actualizar persona
- `DELETE /api/persona/{email}` - Eliminar persona

### Tipos de Certificado
- `POST /api/cert-type` - Crear tipo de certificado
- `GET /api/cert-type` - Obtener todos los tipos de certificado
- `GET /api/cert-type/{id}` - Obtener tipo de certificado por ID
- `GET /api/cert-type/tipo/{tipo}` - Obtener tipo de certificado por tipo
- `PUT /api/cert-type/{id}` - Actualizar tipo de certificado
- `DELETE /api/cert-type/{id}` - Eliminar tipo de certificado

### Reconocimiento
- `POST /api/reconocimiento` - Crear reconocimiento
- `GET /api/reconocimiento` - Obtener todos los reconocimientos
- `GET /api/reconocimiento/stats` - Obtener estadísticas
- `GET /api/reconocimiento/{id}` - Obtener reconocimiento por ID
- `GET /api/reconocimiento/email/{email}` - Obtener reconocimientos por email
- `GET /api/reconocimiento/cert-type/{cert_type_id}` - Obtener reconocimientos por ID de tipo
- `GET /api/reconocimiento/tipo/{tipo}` - Obtener reconocimientos por tipo
- `PUT /api/reconocimiento/{id}` - Actualizar reconocimiento
- `DELETE /api/reconocimiento/{id}` - Eliminar reconocimiento

### LinkedIn
- `GET /api/linkedin` - Obtener datos de LinkedIn
- `GET /api/linkedin/getLinkedin` - Callback de autenticación OAuth de LinkedIn

## 📊 Datos de Prueba Incluidos

El sistema incluye datos de prueba predefinidos:

### Tipos de Certificado:
- KUDOS - Reconocimiento por colaboración
- ACHIEVEMENT - Logro destacado del sprint
- THANKYOU - Agradecimiento especial

### Personas de Ejemplo:
- Ana Soto (Marketing, Team Lead)
- José Mendoza (Engineering, Developer)
- Carla Vera (RRHH, Coordinator)

### Reconocimientos de Ejemplo:
- Ana Soto recibió un KUDOS en "Weekly Sync"
- José Mendoza recibió un ACHIEVEMENT en "Sprint Review"
- Carla Vera recibió un THANKYOU en "All-hands" 