const request = require('supertest')
const app = require('../app')
const axios = require('axios')

jest.mock('axios')

describe('Middleware tests - Params', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })
    afterEach(() => {
        axios.get.mockReset()
    })

    test('Llamada a endpoint /pokemon/byName/:pokemonName con params con espacios en blanco', async () => {
        process.env.SERVICE_POKEMON = 'POKEMON'

        const res = await request(app)
            .get('/api/pokemon/byName/ charmaleon')
            .set('service', 'POKEMON')
            .set('x-country', 'NA')
            .set('x-customerId', 'NA')
            .set('x-commerce', 'NA')
            .set('x-channel', 'NA')
            .set('x-usrtx', 'NA')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(0)
        expect(res.status).toEqual(403)
    })

    test('Llamada a endpoint /pokemon/byName/:pokemonName con params inválido', async () => {
        process.env.SERVICE_POKEMON = 'POKEMON'

        const res = await request(app)
            .get('/api/pokemon/byName/:pokemonName')
            .set('service', 'POKEMON')
            .set('x-country', 'NA')
            .set('x-customerId', 'NA')
            .set('x-commerce', 'NA')
            .set('x-channel', 'NA')
            .set('x-usrtx', 'NA')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(0)
        expect(res.status).toEqual(403)
    })
})

describe('Middleware tests - Headers', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })
    afterEach(() => {
        axios.get.mockReset()
    })

    test('Llamada a endpoint /pokemon sin headers', async () => {
        process.env.SERVICE_POKEMON = 'POKEMON'

        const res = await request(app).get('/api/pokemon').set('service', 'POKEMON')

        expect(axios.get).toHaveBeenCalledTimes(0)
        expect(res.status).toEqual(400)
    })

    test('Llamada a endpoint /pokemon/byName/:pokemonName sin headers', async () => {
        process.env.SERVICE_POKEMON = 'POKEMON'

        const res = await request(app).get('/api/pokemon/byName/charmaleon').set('service', 'POKEMON')

        expect(axios.get).toHaveBeenCalledTimes(0)
        expect(res.status).toEqual(400)
    })
})
