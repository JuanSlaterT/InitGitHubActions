const {default: axios} = require('axios')
const {axiosConf} = require('../../config/axios')
const {CustomAxiosError} = require('../../config/Errors/axios.error')

/**
 * Función encargada de conectarse con un servicio externo para obtener los pokemons
 * @param {Request} req - Request desde el cual se obtienen los headers
 * @returns {Object} Objeto que entrega una lista de pokemons
 */
async function getLinkedinService(req) {
    let axiosResponse = null
    const config = axiosConf(
        'POKEMON_URL',
        'SERVICE_POKEMON',
        req.headers['x-country'],
        req.headers['x-customerid'],
        req.headers['x-commerce'],
        req.headers['x-channel'],
        req.headers['x-usrtx'],
        req.headers['x-api-version'],
        'pokedex/kanto'
    )
    await axios
        .get(`${config.baseUrl}`, config.option)
        .then((response) => {
            axiosResponse = response
        })
        .catch((error) => {
            throw new CustomAxiosError(error, 'msPokemon.service', 'getPokemonByNameService')
        })
    return axiosResponse
}

module.exports = {
    getLinkedinService
}
