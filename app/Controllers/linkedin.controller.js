const msLinkedin = require('../Services/msLinkedin.service')
const {logFormat} = require('../Helpers/Utils')

/**
 * Controlador encargado de llamar a la API pokemon
 * @param {Request} req - Request desde el cual se obtienen los headers y params
 * @returns {Object} Objeto que entrega el detalle del pokemon
 */
async function getLinkedin(req, res, next) {
    try {
        console.log('Se recibe el request en getLinkedin')
        logFormat({type: 'info', file: 'linkedin.controller', headers: req.headers, _function: 'getLinkedin', message: 'Se recibe el request', data: {headers: req?.headers}})
        logFormat({
            type: 'info',
            file: 'linkedin.controller',
            headers: req.headers,
            _function: 'getLinkedin',
            message: 'Se envía a la función getLinkedinService los encabezados (headers) para obtener los datos de linkedin',
            data: {headers: req?.headers}
        })
        const {data: linkedinData} = await msLinkedin.getLinkedinService(req)
        logFormat({
            type: 'info',
            file: 'linkedin.controller',
            headers: req.headers,
            _function: 'getLinkedin',
            message: 'Desde la función getLinkedinService se obtienen la información de linkedin',
            data: {headers: req?.headers}
        })
        res.status(200).send({result: linkedinData})
    } catch (error) {
        next(error)
    }
}

module.exports = {getLinkedin}
