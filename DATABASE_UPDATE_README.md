# Actualización de Base de Datos y API

## Resumen de Cambios

Se ha actualizado la estructura de la base de datos para mejorar la normalización y flexibilidad del sistema de reconocimientos. Los cambios principales incluyen:

### 1. Nueva Tabla: `cert_type`

Se agregó una nueva tabla para manejar los tipos de certificado de manera normalizada:

```sql
CREATE TABLE IF NOT EXISTS cert_type (
    id          INTEGER       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo        VARCHAR(24)   NOT NULL,
    nombre      VARCHAR(64)   NOT NULL,
    created_at  TIMESTAMPTZ   DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   DEFAULT NOW()
);
```

### 2. Actualización de la Tabla: `reconocimiento`

Se modificó la tabla de reconocimientos para usar una clave foránea hacia `cert_type`:

```sql
CREATE TABLE IF NOT EXISTS reconocimiento (
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

## Nuevos Archivos Creados

### Servicios
- `app/Services/certType.service.js` - Servicio completo para manejar tipos de certificado

### Controladores
- `app/Controllers/certType.controller.js` - Controlador para tipos de certificado

### Rutas
- `app/Routes/certType.route.js` - Rutas para tipos de certificado

## Archivos Actualizados

### Servicios
- `app/Services/reconocimiento.service.js` - Actualizado para usar `cert_type_id`

### Controladores
- `app/Controllers/reconocimiento.controller.js` - Actualizado con nuevas funciones

### Rutas
- `app/Routes/reconocimiento.route.js` - Actualizado con nuevas rutas

## Nuevas Funcionalidades

### Tipos de Certificado (CertType)

#### Endpoints Disponibles:
- `POST /api/cert-type` - Crear nuevo tipo de certificado
- `GET /api/cert-type` - Obtener todos los tipos de certificado
- `GET /api/cert-type/{id}` - Obtener tipo de certificado por ID
- `GET /api/cert-type/tipo/{tipo}` - Obtener tipo de certificado por tipo
- `PUT /api/cert-type/{id}` - Actualizar tipo de certificado
- `DELETE /api/cert-type/{id}` - Eliminar tipo de certificado

### Reconocimientos Actualizados

#### Nuevos Endpoints:
- `GET /api/reconocimiento/cert-type/{cert_type_id}` - Obtener reconocimientos por ID de tipo
- `GET /api/reconocimiento/tipo/{tipo}` - Obtener reconocimientos por tipo (ej: KUDOS, ACHIEVEMENT)

#### Cambios en Endpoints Existentes:
- `POST /api/reconocimiento` - Ahora requiere `cert_type_id` en lugar de `type`
- `PUT /api/reconocimiento/{id}` - Actualizado para usar `cert_type_id`

## Datos de Prueba

### Tipos de Certificado Iniciales:
```sql
INSERT INTO cert_type (tipo, nombre)
VALUES
  ('KUDOS'      , 'Reconocimiento por colaboración'),
  ('ACHIEVEMENT', 'Logro destacado del sprint'),
  ('THANKYOU'   , 'Agradecimiento especial');
```

### Personas de Prueba:
```sql
INSERT INTO persona (email, full_name, url_image, team, role)
VALUES
  ('ana.soto@example.com' , 'Ana Soto'        , 'https://example.com/img/ana.jpg'  , 'Marketing'   , 'Team Lead'),
  ('jose.mendoza@example.com', 'José Mendoza' , 'https://example.com/img/jose.jpg' , 'Engineering' , 'Developer'),
  ('carla.vera@example.com',  'Carla Vera'    , 'https://example.com/img/carla.jpg', 'RRHH'        , 'Coordinator');
```

### Reconocimientos de Prueba:
```sql
INSERT INTO reconocimiento (email_persona, cert_type_id, meeting)
VALUES
  ('ana.soto@example.com',
       (SELECT id FROM cert_type WHERE tipo = 'KUDOS'),
       'Weekly Sync'),
  ('jose.mendoza@example.com',
       (SELECT id FROM cert_type WHERE tipo = 'ACHIEVEMENT'),
       'Sprint Review'),
  ('carla.vera@example.com',
       (SELECT id FROM cert_type WHERE tipo = 'THANKYOU'),
       'All-hands');
```

## Beneficios de la Nueva Estructura

1. **Normalización**: Los tipos de certificado están normalizados en su propia tabla
2. **Flexibilidad**: Fácil agregar nuevos tipos de certificado sin modificar código
3. **Integridad Referencial**: Las claves foráneas garantizan la integridad de los datos
4. **Escalabilidad**: La estructura permite un crecimiento más organizado
5. **Mantenibilidad**: Código más limpio y fácil de mantener

## Pruebas

Para verificar que todo funciona correctamente, ejecuta:

```bash
node test-db-update.js
```

Este script probará:
- Obtención de tipos de certificado
- Obtención de personas
- Obtención de reconocimientos con información completa
- Estadísticas de reconocimientos

## Migración

Si tienes datos existentes, necesitarás:

1. Crear la tabla `cert_type` con los tipos básicos
2. Migrar los datos existentes de `reconocimiento.type` a `cert_type_id`
3. Actualizar las aplicaciones cliente para usar los nuevos endpoints

## Notas Importantes

- La eliminación de tipos de certificado está restringida si están siendo usados en reconocimientos
- Los timestamps se actualizan automáticamente
- Todas las consultas de reconocimientos ahora incluyen información completa de persona y tipo de certificado 