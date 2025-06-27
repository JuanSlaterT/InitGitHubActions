# API Documentation - Persona y Reconocimiento

## 📋 Descripción General

Esta documentación describe las APIs para gestionar personas y reconocimientos en el sistema. Las APIs están disponibles bajo el prefijo `/api/`.

## 🏗️ Estructura de Base de Datos

### Tabla: `persona`
```sql
CREATE TABLE persona (
    email       VARCHAR(64)  PRIMARY KEY,
    full_name   VARCHAR(64)  NOT NULL,
    url_image   VARCHAR(128) NOT NULL,
    team        VARCHAR(24)  NOT NULL,
    role        VARCHAR(32)  NOT NULL
);
```

### Tabla: `reconocimiento`
```sql
CREATE TABLE reconocimiento (
    id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email_persona   VARCHAR(64)  NOT NULL,
    created_at      DATE         NOT NULL,
    type            VARCHAR(20)  NOT NULL,
    meeting         VARCHAR(64)  NOT NULL,
    
    CONSTRAINT fk_reconocimiento_persona
        FOREIGN KEY (email_persona)
        REFERENCES persona(email)
        ON UPDATE CASCADE
        ON DELETE CASCADE
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
    "role": "Desarrollador"
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
        "role": "Desarrollador"
    }
}
```

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
            "role": "Desarrollador"
        },
        {
            "email": "usuario2@ejemplo.com",
            "full_name": "María García",
            "url_image": "https://ejemplo.com/imagen2.jpg",
            "team": "Diseño",
            "role": "Diseñadora"
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
        "role": "Desarrollador"
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
    "role": "Desarrollador Senior"
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
        "role": "Desarrollador Senior"
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
        "role": "Desarrollador"
    },
    "message": "Persona eliminada exitosamente"
}
```

## 🏆 APIs de Reconocimiento

### Base URL: `/api/reconocimiento`

#### 1. Crear Reconocimiento
- **POST** `/api/reconocimiento`
- **Descripción**: Crea un nuevo reconocimiento para una persona
- **Body**:
```json
{
    "email_persona": "usuario@ejemplo.com",
    "created_at": "2024-01-15",
    "type": "Excelencia",
    "meeting": "Reunión Mensual Enero"
}
```
- **Respuesta Exitosa** (201):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "created_at": "2024-01-15",
        "type": "Excelencia",
        "meeting": "Reunión Mensual Enero"
    }
}
```

#### 2. Obtener Todos los Reconocimientos
- **GET** `/api/reconocimiento`
- **Descripción**: Obtiene todos los reconocimientos con información de la persona
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "created_at": "2024-01-15",
            "type": "Excelencia",
            "meeting": "Reunión Mensual Enero",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador"
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
        "created_at": "2024-01-15",
        "type": "Excelencia",
        "meeting": "Reunión Mensual Enero",
        "full_name": "Juan Pérez",
        "team": "Desarrollo",
        "role": "Desarrollador"
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
            "created_at": "2024-01-15",
            "type": "Excelencia",
            "meeting": "Reunión Mensual Enero",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador"
        }
    ]
}
```

#### 5. Obtener Reconocimientos por Tipo
- **GET** `/api/reconocimiento/type/{type}`
- **Descripción**: Obtiene todos los reconocimientos de un tipo específico
- **Parámetros**: `type` (string)
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "id": 1,
            "email_persona": "usuario@ejemplo.com",
            "created_at": "2024-01-15",
            "type": "Excelencia",
            "meeting": "Reunión Mensual Enero",
            "full_name": "Juan Pérez",
            "team": "Desarrollo",
            "role": "Desarrollador"
        }
    ]
}
```

#### 6. Obtener Estadísticas
- **GET** `/api/reconocimiento/stats`
- **Descripción**: Obtiene estadísticas de reconocimientos
- **Respuesta Exitosa** (200):
```json
{
    "result": [
        {
            "total_reconocimientos": "10",
            "personas_con_reconocimientos": "8",
            "type": "Excelencia",
            "count_by_type": "5"
        },
        {
            "total_reconocimientos": "10",
            "personas_con_reconocimientos": "8",
            "type": "Innovación",
            "count_by_type": "3"
        }
    ]
}
```

#### 7. Actualizar Reconocimiento
- **PUT** `/api/reconocimiento/{id}`
- **Descripción**: Actualiza un reconocimiento existente
- **Parámetros**: `id` (integer)
- **Body**:
```json
{
    "email_persona": "usuario@ejemplo.com",
    "created_at": "2024-01-20",
    "type": "Innovación",
    "meeting": "Reunión Mensual Enero Actualizada"
}
```
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "created_at": "2024-01-20",
        "type": "Innovación",
        "meeting": "Reunión Mensual Enero Actualizada"
    }
}
```

#### 8. Eliminar Reconocimiento
- **DELETE** `/api/reconocimiento/{id}`
- **Descripción**: Elimina un reconocimiento específico
- **Parámetros**: `id` (integer)
- **Respuesta Exitosa** (200):
```json
{
    "result": {
        "id": 1,
        "email_persona": "usuario@ejemplo.com",
        "created_at": "2024-01-15",
        "type": "Excelencia",
        "meeting": "Reunión Mensual Enero"
    },
    "message": "Reconocimiento eliminado exitosamente"
}
```

## 🔧 Códigos de Estado HTTP

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Conflicto (ej: email duplicado)
- **500**: Internal Server Error - Error interno del servidor

## 📝 Ejemplos de Uso

### Ejemplo 1: Crear una persona y darle un reconocimiento

```bash
# 1. Crear persona
curl -X POST http://localhost:3000/api/persona \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@empresa.com",
    "full_name": "Juan Pérez",
    "url_image": "https://empresa.com/fotos/juan.jpg",
    "team": "Desarrollo",
    "role": "Desarrollador Senior"
  }'

# 2. Crear reconocimiento
curl -X POST http://localhost:3000/api/reconocimiento \
  -H "Content-Type: application/json" \
  -d '{
    "email_persona": "juan.perez@empresa.com",
    "created_at": "2024-01-15",
    "type": "Excelencia",
    "meeting": "Reunión Mensual Enero 2024"
  }'
```

### Ejemplo 2: Obtener todos los reconocimientos de una persona

```bash
curl -X GET http://localhost:3000/api/reconocimiento/email/juan.perez@empresa.com
```

### Ejemplo 3: Obtener estadísticas de reconocimientos

```bash
curl -X GET http://localhost:3000/api/reconocimiento/stats
```

## 🚀 Notas Importantes

1. **Validación de Email**: El email debe ser único en la tabla `persona`
2. **Cascade Delete**: Al eliminar una persona, se eliminan automáticamente todos sus reconocimientos
3. **JOIN Automático**: Las consultas de reconocimientos incluyen automáticamente los datos de la persona
4. **Logging**: Todas las operaciones se registran en los logs del sistema
5. **Documentación Swagger**: Las APIs están documentadas en Swagger en `/doc`

## 🔍 Endpoints Disponibles

### Persona
- `POST /api/persona` - Crear persona
- `GET /api/persona` - Obtener todas las personas
- `GET /api/persona/{email}` - Obtener persona por email
- `PUT /api/persona/{email}` - Actualizar persona
- `DELETE /api/persona/{email}` - Eliminar persona

### Reconocimiento
- `POST /api/reconocimiento` - Crear reconocimiento
- `GET /api/reconocimiento` - Obtener todos los reconocimientos
- `GET /api/reconocimiento/stats` - Obtener estadísticas
- `GET /api/reconocimiento/{id}` - Obtener reconocimiento por ID
- `GET /api/reconocimiento/email/{email}` - Obtener reconocimientos por email
- `GET /api/reconocimiento/type/{type}` - Obtener reconocimientos por tipo
- `PUT /api/reconocimiento/{id}` - Actualizar reconocimiento
- `DELETE /api/reconocimiento/{id}` - Eliminar reconocimiento 