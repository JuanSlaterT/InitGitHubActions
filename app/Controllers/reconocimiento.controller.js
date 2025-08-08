const reconocimientoService = require('../Services/reconocimiento.service');
const { logFormat } = require('../Helpers/Utils');

/**
 * Controlador para crear un nuevo reconocimiento
 * @param {Request} req - Request con los datos del reconocimiento
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function createReconocimiento(req, res, next) {
    try {
        console.log('Se recibe el request en createReconocimiento');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'createReconocimiento',
            message: 'Se recibe el request para crear reconocimiento',
            data: { body: req.body }
        });

        const reconocimientoData = req.body;
        const result = await reconocimientoService.createReconocimiento(reconocimientoData);
        
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'createReconocimiento',
            message: 'Reconocimiento creado exitosamente',
            data: { result }
        });

        res.status(201).send({ 
            result,
            message: 'Reconocimiento creado exitosamente'
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener todos los reconocimientos
 * @param {Request} req - Request
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getAllReconocimientos(req, res, next) {
    try {
        console.log('Se recibe el request en getAllReconocimientos');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getAllReconocimientos',
            message: 'Se recibe el request para obtener todos los reconocimientos'
        });

        const result = await reconocimientoService.getAllReconocimientos();

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getAllReconocimientos',
            message: 'Reconocimientos obtenidos exitosamente',
            data: { count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener un reconocimiento por ID
 * @param {Request} req - Request con el ID en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getReconocimientoById(req, res, next) {
    try {
        const { id } = req.params;
        console.log('Se recibe el request en getReconocimientoById');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientoById',
            message: 'Se recibe el request para obtener reconocimiento por ID',
            data: { id }
        });

        const result = await reconocimientoService.getReconocimientoById(id);

        if (!result) {
            return res.status(404).send({ 
                error: 'Reconocimiento no encontrado',
                message: `No se encontró un reconocimiento con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientoById',
            message: 'Reconocimiento obtenido exitosamente',
            data: { id }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener reconocimientos por nombre de colaborador
 * @param {Request} req - Request con el nombre en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getReconocimientosByColaborador(req, res, next) {
    try {
        const { nombre_colaborador } = req.params;
        console.log('Se recibe el request en getReconocimientosByColaborador');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByColaborador',
            message: 'Se recibe el request para obtener reconocimientos por colaborador',
            data: { nombre_colaborador }
        });

        const result = await reconocimientoService.getReconocimientosByColaborador(nombre_colaborador);

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByColaborador',
            message: 'Reconocimientos obtenidos exitosamente',
            data: { nombre_colaborador, count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener reconocimientos por tipo de certificado (ID)
 * @param {Request} req - Request con el cert_type_id en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getReconocimientosByCertTypeId(req, res, next) {
    try {
        const { cert_type_id } = req.params;
        console.log('Se recibe el request en getReconocimientosByCertTypeId');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByCertTypeId',
            message: 'Se recibe el request para obtener reconocimientos por tipo de certificado ID',
            data: { cert_type_id }
        });

        const result = await reconocimientoService.getReconocimientosByCertTypeId(cert_type_id);

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByCertTypeId',
            message: 'Reconocimientos obtenidos exitosamente',
            data: { cert_type_id, count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener reconocimientos por tipo de certificado (tipo)
 * @param {Request} req - Request con el tipo en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getReconocimientosByTipo(req, res, next) {
    try {
        const { tipo } = req.params;
        console.log('Se recibe el request en getReconocimientosByTipo');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByTipo',
            message: 'Se recibe el request para obtener reconocimientos por tipo',
            data: { tipo }
        });

        const result = await reconocimientoService.getReconocimientosByTipo(tipo);

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientosByTipo',
            message: 'Reconocimientos obtenidos exitosamente',
            data: { tipo, count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para actualizar un reconocimiento
 * @param {Request} req - Request con el ID en params y datos en body
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function updateReconocimiento(req, res, next) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        console.log('Se recibe el request en updateReconocimiento');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'updateReconocimiento',
            message: 'Se recibe el request para actualizar reconocimiento',
            data: { id, updateData }
        });

        const result = await reconocimientoService.updateReconocimiento(id, updateData);

        if (!result) {
            return res.status(404).send({ 
                error: 'Reconocimiento no encontrado',
                message: `No se encontró un reconocimiento con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'updateReconocimiento',
            message: 'Reconocimiento actualizado exitosamente',
            data: { id }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para eliminar un reconocimiento
 * @param {Request} req - Request con el ID en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function deleteReconocimiento(req, res, next) {
    try {
        const { id } = req.params;
        
        console.log('Se recibe el request en deleteReconocimiento');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'deleteReconocimiento',
            message: 'Se recibe el request para eliminar reconocimiento',
            data: { id }
        });

        const result = await reconocimientoService.deleteReconocimiento(id);

        if (!result) {
            return res.status(404).send({ 
                error: 'Reconocimiento no encontrado',
                message: `No se encontró un reconocimiento con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'deleteReconocimiento',
            message: 'Reconocimiento eliminado exitosamente',
            data: { id }
        });

        res.status(200).send({ 
            message: 'Reconocimiento eliminado exitosamente',
            result 
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener estadísticas de reconocimientos
 * @param {Request} req - Request
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getReconocimientoStats(req, res, next) {
    try {
        console.log('Se recibe el request en getReconocimientoStats');
        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientoStats',
            message: 'Se recibe el request para obtener estadísticas de reconocimientos'
        });

        const result = await reconocimientoService.getReconocimientoStats();

        logFormat({
            type: 'info',
            file: 'reconocimiento.controller',
            headers: req.headers,
            _function: 'getReconocimientoStats',
            message: 'Estadísticas obtenidas exitosamente',
            data: { count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
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