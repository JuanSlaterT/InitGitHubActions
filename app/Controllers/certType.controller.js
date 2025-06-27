const certTypeService = require('../Services/certType.service');
const { logFormat } = require('../Helpers/Utils');

/**
 * Controlador para crear un nuevo tipo de certificado
 * @param {Request} req - Request con los datos del tipo de certificado
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function createCertType(req, res, next) {
    try {
        console.log('Se recibe el request en createCertType');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'createCertType',
            message: 'Se recibe el request para crear tipo de certificado',
            data: { body: req.body }
        });

        const certTypeData = req.body;
        const result = await certTypeService.createCertType(certTypeData);

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'createCertType',
            message: 'Tipo de certificado creado exitosamente',
            data: { result }
        });

        res.status(201).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener todos los tipos de certificado
 * @param {Request} req - Request
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getAllCertTypes(req, res, next) {
    try {
        console.log('Se recibe el request en getAllCertTypes');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getAllCertTypes',
            message: 'Se recibe el request para obtener todos los tipos de certificado'
        });

        const result = await certTypeService.getAllCertTypes();

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getAllCertTypes',
            message: 'Tipos de certificado obtenidos exitosamente',
            data: { count: result.length }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener un tipo de certificado por ID
 * @param {Request} req - Request con el ID en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getCertTypeById(req, res, next) {
    try {
        const { id } = req.params;
        console.log('Se recibe el request en getCertTypeById');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getCertTypeById',
            message: 'Se recibe el request para obtener tipo de certificado por ID',
            data: { id }
        });

        const result = await certTypeService.getCertTypeById(id);

        if (!result) {
            return res.status(404).send({ 
                error: 'Tipo de certificado no encontrado',
                message: `No se encontró un tipo de certificado con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getCertTypeById',
            message: 'Tipo de certificado obtenido exitosamente',
            data: { id }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para obtener un tipo de certificado por tipo
 * @param {Request} req - Request con el tipo en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function getCertTypeByTipo(req, res, next) {
    try {
        const { tipo } = req.params;
        console.log('Se recibe el request en getCertTypeByTipo');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getCertTypeByTipo',
            message: 'Se recibe el request para obtener tipo de certificado por tipo',
            data: { tipo }
        });

        const result = await certTypeService.getCertTypeByTipo(tipo);

        if (!result) {
            return res.status(404).send({ 
                error: 'Tipo de certificado no encontrado',
                message: `No se encontró un tipo de certificado con el tipo: ${tipo}`
            });
        }

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'getCertTypeByTipo',
            message: 'Tipo de certificado obtenido exitosamente',
            data: { tipo }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para actualizar un tipo de certificado
 * @param {Request} req - Request con el ID en params y datos en body
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function updateCertType(req, res, next) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        console.log('Se recibe el request en updateCertType');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'updateCertType',
            message: 'Se recibe el request para actualizar tipo de certificado',
            data: { id, updateData }
        });

        const result = await certTypeService.updateCertType(id, updateData);

        if (!result) {
            return res.status(404).send({ 
                error: 'Tipo de certificado no encontrado',
                message: `No se encontró un tipo de certificado con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'updateCertType',
            message: 'Tipo de certificado actualizado exitosamente',
            data: { id }
        });

        res.status(200).send({ result });
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para eliminar un tipo de certificado
 * @param {Request} req - Request con el ID en params
 * @param {Response} res - Response para enviar la respuesta
 * @param {NextFunction} next - Función next para manejo de errores
 */
async function deleteCertType(req, res, next) {
    try {
        const { id } = req.params;
        
        console.log('Se recibe el request en deleteCertType');
        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'deleteCertType',
            message: 'Se recibe el request para eliminar tipo de certificado',
            data: { id }
        });

        const result = await certTypeService.deleteCertType(id);

        if (!result) {
            return res.status(404).send({ 
                error: 'Tipo de certificado no encontrado',
                message: `No se encontró un tipo de certificado con el ID: ${id}`
            });
        }

        logFormat({
            type: 'info',
            file: 'certType.controller',
            headers: req.headers,
            _function: 'deleteCertType',
            message: 'Tipo de certificado eliminado exitosamente',
            data: { id }
        });

        res.status(200).send({ 
            message: 'Tipo de certificado eliminado exitosamente',
            result 
        });
    } catch (error) {
        next(error);
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