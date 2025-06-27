const { db } = require('../../config/database');

/**
 * Crear una nueva persona
 * @param {Object} personaData - Datos de la persona
 * @param {string} personaData.email - Email de la persona (PRIMARY KEY)
 * @param {string} personaData.full_name - Nombre completo
 * @param {string} personaData.url_image - URL de la imagen
 * @param {string} personaData.team - Equipo
 * @param {string} personaData.role - Rol
 * @returns {Object} Persona creada
 */
async function createPersona(personaData) {
    const { email, full_name, url_image, team, role } = personaData;
    
    const query = `
        INSERT INTO persona (email, full_name, url_image, team, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    
    try {
        const result = await db.one(query, [email, full_name, url_image, team, role]);
        return result;
    } catch (error) {
        throw new Error(`Error al crear persona: ${error.message}`);
    }
}

/**
 * Obtener todas las personas
 * @returns {Array} Lista de todas las personas
 */
async function getAllPersonas() {
    const query = 'SELECT * FROM persona ORDER BY email';
    
    try {
        const result = await db.any(query);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener personas: ${error.message}`);
    }
}

/**
 * Obtener una persona por email
 * @param {string} email - Email de la persona
 * @returns {Object} Persona encontrada
 */
async function getPersonaByEmail(email) {
    const query = 'SELECT * FROM persona WHERE email = $1';
    
    try {
        const result = await db.oneOrNone(query, [email]);
        return result;
    } catch (error) {
        throw new Error(`Error al obtener persona: ${error.message}`);
    }
}

/**
 * Actualizar una persona
 * @param {string} email - Email de la persona a actualizar
 * @param {Object} updateData - Datos a actualizar
 * @param {string} updateData.full_name - Nombre completo
 * @param {string} updateData.url_image - URL de la imagen
 * @param {string} updateData.team - Equipo
 * @param {string} updateData.role - Rol
 * @returns {Object} Persona actualizada
 */
async function updatePersona(email, updateData) {
    const { full_name, url_image, team, role } = updateData;
    
    const query = `
        UPDATE persona 
        SET full_name = $1, url_image = $2, team = $3, role = $4
        WHERE email = $5
        RETURNING *
    `;
    
    try {
        const result = await db.oneOrNone(query, [full_name, url_image, team, role, email]);
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar persona: ${error.message}`);
    }
}

/**
 * Eliminar una persona
 * @param {string} email - Email de la persona a eliminar
 * @returns {Object} Resultado de la eliminación
 */
async function deletePersona(email) {
    const query = 'DELETE FROM persona WHERE email = $1 RETURNING *';
    
    try {
        const result = await db.oneOrNone(query, [email]);
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar persona: ${error.message}`);
    }
}

module.exports = {
    createPersona,
    getAllPersonas,
    getPersonaByEmail,
    updatePersona,
    deletePersona
}; 