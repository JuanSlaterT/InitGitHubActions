const { db } = require('../../config/database');

/**
 * Crear un nuevo reconocimiento
 * @param {Object} reconocimientoData - Datos del reconocimiento
 * @param {string} reconocimientoData.email_persona - Email de la persona
 * @param {Date} reconocimientoData.created_at - Fecha de creación
 * @param {string} reconocimientoData.type - Tipo de reconocimiento
 * @param {string} reconocimientoData.meeting - Reunión
 * @returns {Object} Reconocimiento creado
 */
async function createReconocimiento(reconocimientoData) {
    const { email_persona, created_at, type, meeting } = reconocimientoData;
    
    const query = `
        INSERT INTO reconocimiento (email_persona, created_at, type, meeting)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    
    try {
        const result = await db.one(query, [email_persona, created_at, type, meeting]);
        return result;
    } catch (error) {
        throw new Error(`Error al crear reconocimiento: ${error.message}`);
    }
}

/**
 * Obtener todos los reconocimientos
 * @returns {Array} Lista de todos los reconocimientos
 */
async function getAllReconocimientos() {
    const query = `
        SELECT r.*, p.full_name, p.team, p.role
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
 * Obtener un reconocimiento por ID
 * @param {number} id - ID del reconocimiento
 * @returns {Object} Reconocimiento encontrado
 */
async function getReconocimientoById(id) {
    const query = `
        SELECT r.*, p.full_name, p.team, p.role
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
 * Obtener reconocimientos por email de persona
 * @param {string} email_persona - Email de la persona
 * @returns {Array} Lista de reconocimientos de la persona
 */
async function getReconocimientosByEmail(email_persona) {
    const query = `
        SELECT r.*, p.full_name, p.team, p.role
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
        WHERE r.email_persona = $1
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query, [email_persona]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos por email: ${error.message}`);
    }
}

/**
 * Obtener reconocimientos por tipo
 * @param {string} type - Tipo de reconocimiento
 * @returns {Array} Lista de reconocimientos del tipo especificado
 */
async function getReconocimientosByType(type) {
    const query = `
        SELECT r.*, p.full_name, p.team, p.role
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
        WHERE r.type = $1
        ORDER BY r.created_at DESC, r.id DESC
    `;
    
    try {
        const result = await db.any(query, [type]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener reconocimientos por tipo: ${error.message}`);
    }
}

/**
 * Actualizar un reconocimiento
 * @param {number} id - ID del reconocimiento a actualizar
 * @param {Object} updateData - Datos a actualizar
 * @param {string} updateData.email_persona - Email de la persona
 * @param {Date} updateData.created_at - Fecha de creación
 * @param {string} updateData.type - Tipo de reconocimiento
 * @param {string} updateData.meeting - Reunión
 * @returns {Object} Reconocimiento actualizado
 */
async function updateReconocimiento(id, updateData) {
    const { email_persona, created_at, type, meeting } = updateData;
    
    const query = `
        UPDATE reconocimiento 
        SET email_persona = $1, created_at = $2, type = $3, meeting = $4
        WHERE id = $5
        RETURNING *
    `;
    
    try {
        const result = await db.oneOrNone(query, [email_persona, created_at, type, meeting, id]);
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar reconocimiento: ${error.message}`);
    }
}

/**
 * Eliminar un reconocimiento
 * @param {number} id - ID del reconocimiento a eliminar
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
            COUNT(DISTINCT email_persona) as personas_con_reconocimientos,
            type,
            COUNT(*) as count_by_type
        FROM reconocimiento 
        GROUP BY type
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
    getReconocimientosByEmail,
    getReconocimientosByType,
    updateReconocimiento,
    deleteReconocimiento,
    getReconocimientoStats
}; 