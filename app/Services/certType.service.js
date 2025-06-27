const { db } = require('../../config/database');

/**
 * Crear un nuevo tipo de certificado
 * @param {Object} certTypeData - Datos del tipo de certificado
 * @param {string} certTypeData.tipo - Tipo de certificado
 * @param {string} certTypeData.nombre - Nombre del certificado
 * @returns {Object} Tipo de certificado creado
 */
async function createCertType(certTypeData) {
    const { tipo, nombre } = certTypeData;
    
    const query = `
        INSERT INTO cert_type (tipo, nombre)
        VALUES ($1, $2)
        RETURNING *
    `;
    
    try {
        const result = await db.one(query, [tipo, nombre]);
        return result;
    } catch (error) {
        throw new Error(`Error al crear tipo de certificado: ${error.message}`);
    }
}

/**
 * Obtener todos los tipos de certificado
 * @returns {Array} Lista de todos los tipos de certificado
 */
async function getAllCertTypes() {
    const query = 'SELECT * FROM cert_type ORDER BY tipo';
    
    try {
        const result = await db.any(query);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener tipos de certificado: ${error.message}`);
    }
}

/**
 * Obtener un tipo de certificado por ID
 * @param {number} id - ID del tipo de certificado
 * @returns {Object} Tipo de certificado encontrado
 */
async function getCertTypeById(id) {
    const query = 'SELECT * FROM cert_type WHERE id = $1';
    
    try {
        const result = await db.oneOrNone(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener tipo de certificado: ${error.message}`);
    }
}

/**
 * Obtener un tipo de certificado por tipo
 * @param {string} tipo - Tipo de certificado
 * @returns {Object} Tipo de certificado encontrado
 */
async function getCertTypeByTipo(tipo) {
    const query = 'SELECT * FROM cert_type WHERE tipo = $1';
    
    try {
        const result = await db.oneOrNone(query, [tipo]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener tipo de certificado: ${error.message}`);
    }
}

/**
 * Actualizar un tipo de certificado
 * @param {number} id - ID del tipo de certificado a actualizar
 * @param {Object} updateData - Datos a actualizar
 * @param {string} updateData.tipo - Tipo de certificado
 * @param {string} updateData.nombre - Nombre del certificado
 * @returns {Object} Tipo de certificado actualizado
 */
async function updateCertType(id, updateData) {
    const { tipo, nombre } = updateData;
    
    const query = `
        UPDATE cert_type 
        SET tipo = $1, nombre = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *
    `;
    
    try {
        const result = await db.oneOrNone(query, [tipo, nombre, id]);
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar tipo de certificado: ${error.message}`);
    }
}

/**
 * Eliminar un tipo de certificado
 * @param {number} id - ID del tipo de certificado a eliminar
 * @returns {Object} Resultado de la eliminación
 */
async function deleteCertType(id) {
    const query = 'DELETE FROM cert_type WHERE id = $1 RETURNING *';
    
    try {
        const result = await db.oneOrNone(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar tipo de certificado: ${error.message}`);
    }
}

module.exports = {
    createCertType,
    getAllCertTypes,
    getCertTypeById,
    getCertTypeByTipo,
    updateCertType,
    deleteCertType
}; 