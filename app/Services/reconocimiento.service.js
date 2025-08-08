const { db } = require('../../config/database');
const certTypeService = require('./certType.service');

/**
 * Crear un nuevo reconocimiento
 * @param {Object} reconocimientoData - Datos del reconocimiento
 * @param {number} reconocimientoData.cert_type_id - ID del tipo de certificado
 * @param {string} reconocimientoData.meeting - Reunión
 * @param {string} reconocimientoData.nombre_colaborador - Nombre del colaborador
 * @returns {Object} Reconocimiento creado
 */
async function createReconocimiento(reconocimientoData) {
    const { cert_type_id, meeting, nombre_colaborador } = reconocimientoData;
    
    const query = `
        INSERT INTO reconocimiento (cert_type_id, meeting, nombre_colaborador)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    
    try {
        // Verificar que el tipo de certificado existe
        const certType = await certTypeService.getCertTypeById(cert_type_id);
        if (!certType) {
            throw new Error(`No se encontró el tipo de certificado con ID: ${cert_type_id}`);
        }
        
        // Crear el reconocimiento
        const result = await db.one(query, [cert_type_id, meeting, nombre_colaborador]);
        
        return result;
    } catch (error) {
        throw new Error(`Error al crear reconocimiento: ${error.message}`);
    }
}

/**
 * Obtener todos los reconocimientos con información completa
 * @returns {Array} Lista de todos los reconocimientos
 */
async function getAllReconocimientos() {
    const query = `
        SELECT 
            r.*,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos: ${error.message}`);
    }
}

/**
 * Obtener un reconocimiento por ID con información completa
 * @param {string} id - ID del reconocimiento (UUID)
 * @returns {Object} Reconocimiento encontrado
 */
async function getReconocimientoById(id) {
    const query = `
        SELECT 
            r.*,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        WHERE r.id = $1
    `;
    
    try {
        const result = await db.oneOrNone(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimiento: ${error.message}`);
    }
}

/**
 * Obtener reconocimientos por nombre de colaborador
 * @param {string} nombre_colaborador - Nombre del colaborador
 * @returns {Array} Lista de reconocimientos del colaborador
 */
async function getReconocimientosByColaborador(nombre_colaborador) {
    const query = `
        SELECT 
            r.*,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        WHERE r.nombre_colaborador = $1
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query, [nombre_colaborador]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos por colaborador: ${error.message}`);
    }
}

/**
 * Obtener reconocimientos por tipo de certificado
 * @param {number} cert_type_id - ID del tipo de certificado
 * @returns {Array} Lista de reconocimientos del tipo especificado
 */
async function getReconocimientosByCertTypeId(cert_type_id) {
    const query = `
        SELECT 
            r.*,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        WHERE r.cert_type_id = $1
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query, [cert_type_id]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos por tipo: ${error.message}`);
    }
}

/**
 * Obtener reconocimientos por tipo de certificado (usando el campo tipo)
 * @param {string} tipo - Tipo de certificado (ej: KUDOS, ACHIEVEMENT, THANKYOU)
 * @returns {Array} Lista de reconocimientos del tipo especificado
 */
async function getReconocimientosByTipo(tipo) {
    const query = `
        SELECT 
            r.*,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        WHERE ct.tipo = $1
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query, [tipo]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos por tipo: ${error.message}`);
    }
}

/**
 * Actualizar un reconocimiento
 * @param {string} id - ID del reconocimiento a actualizar (UUID)
 * @param {Object} updateData - Datos a actualizar
 * @param {number} updateData.cert_type_id - ID del tipo de certificado
 * @param {string} updateData.meeting - Reunión
 * @param {string} updateData.nombre_colaborador - Nombre del colaborador
 * @returns {Object} Reconocimiento actualizado
 */
async function updateReconocimiento(id, updateData) {
    const { cert_type_id, meeting, nombre_colaborador } = updateData;
    
    const query = `
        UPDATE reconocimiento 
        SET cert_type_id = $1, meeting = $2, nombre_colaborador = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING *
    `;
    
    try {
        const result = await db.oneOrNone(query, [cert_type_id, meeting, nombre_colaborador, id]);
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar reconocimiento: ${error.message}`);
    }
}

/**
 * Eliminar un reconocimiento
 * @param {string} id - ID del reconocimiento a eliminar (UUID)
 * @returns {Object} Resultado de la eliminación
 */
async function deleteReconocimiento(id) {
    const query = 'DELETE FROM reconocimiento WHERE id = $1 RETURNING *';
    
    try {
        const result = await db.oneOrNone(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar reconocimiento: ${error.message}`);
    }
}

/**
 * Obtener estadísticas de reconocimientos
 * @returns {Object} Estadísticas de reconocimientos
 */
async function getReconocimientoStats() {
    const query = `
        SELECT 
            COUNT(*) as total_reconocimientos,
            COUNT(DISTINCT r.nombre_colaborador) as colaboradores_con_reconocimientos,
            ct.tipo,
            ct.nombre,
            COUNT(*) as count_by_type
        FROM reconocimiento r
        JOIN cert_type ct ON r.cert_type_id = ct.id
        GROUP BY ct.id, ct.tipo, ct.nombre
        ORDER BY count_by_type DESC
    `;
    
    try {
        const result = await db.any(query);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
}

module.exports = {
    createReconocimiento,
    getAllReconocimientos,
    getReconocimientoById,
    getReconocimientosByColaborador,
    getReconocimientosByCertTypeId,
    getReconocimientosByTipo,
    updateReconocimiento,
    deleteReconocimiento,
    getReconocimientoStats
}; 