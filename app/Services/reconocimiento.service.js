const { db } = require('../../config/database');
const personaService = require('./persona.service');
const certTypeService = require('./certType.service');
const { sendRecognitionEmail } = require('./SES.service');

/**
 * Crear un nuevo reconocimiento
 * @param {Object} reconocimientoData - Datos del reconocimiento
 * @param {string} reconocimientoData.email_persona - Email de la persona
 * @param {number} reconocimientoData.cert_type_id - ID del tipo de certificado
 * @param {string} reconocimientoData.meeting - Reunión
 * @returns {Object} Reconocimiento creado
 */
async function createReconocimiento(reconocimientoData) {
    const { email_persona, cert_type_id, meeting } = reconocimientoData;
    
    const query = `
        INSERT INTO reconocimiento (email_persona, cert_type_id, meeting)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    
    try {
        
        // Crear el reconocimiento
        const result = await db.one(query, [email_persona, cert_type_id, meeting]);
        
        // Obtener información de la persona
        const persona = await personaService.getPersonaByEmail(email_persona);
        if (!persona) {
            throw new Error(`No se encontró la persona con email: ${email_persona}`);
        }
        
        // Obtener información del tipo de certificado
        const certType = await certTypeService.getCertTypeById(cert_type_id);
        if (!certType) {
            throw new Error(`No se encontró el tipo de certificado con ID: ${cert_type_id}`);
        }
        
        // Enviar email de reconocimiento
        try {
            const currentYear = new Date().getFullYear();
            const issueDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
            
            await sendRecognitionEmail({
                to: email_persona,
                userName: persona.full_name,
                certType: certType.nombre,
                userRole: persona.role,
                issueDate: issueDate,
                expiryDate: null, // Sin fecha de expiración por defecto
                ctaUrl: "https://www.ixcsvs.online/certificate/" + result.id, // Sin URL de CTA por defecto
                currentYear: currentYear.toString()
            });
        } catch (emailError) {
            // Log del error de email pero no fallar la creación del reconocimiento
            console.error('Error al enviar email de reconocimiento:', {
                error: emailError.message,
                email: email_persona,
                userName: persona.full_name,
                certType: certType.nombre,
                stack: emailError.stack
            });
            // Podrías agregar aquí un log más detallado si tienes un sistema de logging
        }
        
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
            p.full_name, 
            p.team, 
            p.role,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
 * @param {number} id - ID del reconocimiento
 * @returns {Object} Reconocimiento encontrado
 */
async function getReconocimientoById(id) {
    const query = `
        SELECT 
            r.*,
            p.full_name, 
            p.team, 
            p.role,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
 * Obtener reconocimientos por email de persona
 * @param {string} email_persona - Email de la persona
 * @returns {Array} Lista de reconocimientos de la persona
 */
async function getReconocimientosByEmail(email_persona) {
    const query = `
        SELECT 
            r.*,
            p.full_name, 
            p.team, 
            p.role,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
        JOIN cert_type ct ON r.cert_type_id = ct.id
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
 * Obtener reconocimientos por tipo de certificado
 * @param {number} cert_type_id - ID del tipo de certificado
 * @returns {Array} Lista de reconocimientos del tipo especificado
 */
async function getReconocimientosByCertTypeId(cert_type_id) {
    const query = `
        SELECT 
            r.*,
            p.full_name, 
            p.team, 
            p.role,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
            p.full_name, 
            p.team, 
            p.role,
            ct.tipo as cert_type_tipo,
            ct.nombre as cert_type_nombre
        FROM reconocimiento r
        JOIN persona p ON r.email_persona = p.email
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
 * @param {number} id - ID del reconocimiento a actualizar
 * @param {Object} updateData - Datos a actualizar
 * @param {string} updateData.email_persona - Email de la persona
 * @param {number} updateData.cert_type_id - ID del tipo de certificado
 * @param {string} updateData.meeting - Reunión
 * @returns {Object} Reconocimiento actualizado
 */
async function updateReconocimiento(id, updateData) {
    const { email_persona, cert_type_id, meeting } = updateData;
    
    const query = `
        UPDATE reconocimiento 
        SET email_persona = $1, cert_type_id = $2, meeting = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING *
    `;
    
    try {
        const result = await db.oneOrNone(query, [email_persona, cert_type_id, meeting, id]);
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
            COUNT(DISTINCT r.email_persona) as personas_con_reconocimientos,
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
    getReconocimientosByEmail,
    getReconocimientosByCertTypeId,
    getReconocimientosByTipo,
    updateReconocimiento,
    deleteReconocimiento,
    getReconocimientoStats
}; 