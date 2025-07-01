const personaService = require('../Services/persona.service');
const { logFormat } = require('../Helpers/Utils');

/**
 * Controlador para crear una nueva persona
 * @param {Request} req - Request con los datos de la persona
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */

async function createPersona(req, res, next) {
    try {
        console.log('Se recibe el request en createPersona');
        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'createPersona',
            message: 'Se recibe el request para crear persona',
            data: { body: req.body }
        });

        const personaData = req.body;
        const result = await personaService.createPersona(personaData);

        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'createPersona',
            message: 'Persona creada exitosamente',
            data: { result }
        });

        res.status(201).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener todas las personas
 * @param {Request} req - Request
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getAllPersonas(req, res, next) {
    try {
        console.log('Se recibe el request en getAllPersonas');
        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'getAllPersonas',
            message: 'Se recibe el request para obtener todas las personas'
        });

        const result = await personaService.getAllPersonas();

        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'getAllPersonas',
            message: 'Personas obtenidas exitosamente',
            data: { count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener una persona por email
 * @param {Request} req - Request con el email en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getPersonaByEmail(req, res, next) {
    try {
        const { email } = req.params;
        console.log('Se recibe el request en getPersonaByEmail');
        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'getPersonaByEmail',
            message: 'Se recibe el request para obtener persona por email',
            data: { email }
        });

        const result = await personaService.getPersonaByEmail(email);

        if (!result) {
            return res.status(404).send({ 
                error: 'Persona no encontrada',
                message: `No se encontró una persona con el email: ${email}`
            });
        }

        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'getPersonaByEmail',
            message: 'Persona obtenida exitosamente',
            data: { email }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para actualizar una persona
 * @param {Request} req - Request con el email en params y datos en body
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function updatePersona(req, res, next) {
    try {
        const { email } = req.params;
        const updateData = req.body;
        
        console.log('Se recibe el request en updatePersona');
        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'updatePersona',
            message: 'Se recibe el request para actualizar persona',
            data: { email, updateData }
        });

        const result = await personaService.updatePersona(email, updateData);

        if (!result) {
            return res.status(404).send({ 
                error: 'Persona no encontrada',
                message: `No se encontró una persona con el email: ${email}`
            });
        }

        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'updatePersona',
            message: 'Persona actualizada exitosamente',
            data: { email }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para eliminar una persona
 * @param {Request} req - Request con el email en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function deletePersona(req, res, next) {
    try {
        const { email } = req.params;
        
        console.log('Se recibe el request en deletePersona');
        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'deletePersona',
            message: 'Se recibe el request para eliminar persona',
            data: { email }
        });

        const result = await personaService.deletePersona(email);

        if (!result) {
            return res.status(404).send({ 
                error: 'Persona no encontrada',
                message: `No se encontró una persona con el email: ${email}`
            });
        }

        logFormat({
            type: 'info',
            file: 'persona.controller',
            headers: req.headers,
            _function: 'deletePersona',
            message: 'Persona eliminada exitosamente',
            data: { email }
        });

        res.status(200).send({ 
            result,
            message: 'Persona eliminada exitosamente'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPersona,
    getAllPersonas,
    getPersonaByEmail,
    updatePersona,
    deletePersona
}; 