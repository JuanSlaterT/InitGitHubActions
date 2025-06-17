const paramsMiddleware = require('../app/Middlewares/param.middleware')
const headersMiddleware = require('../app/Middlewares/header.middleware')

describe('Middleware params test', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })

    test('Test para params correcto', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-customerid': 'SAMSUNG',
                'x-api-version': '1'
            },
            params: {
                pokemonName: 'charmander'
            }
        }

        const res = jest.fn()
        const next = jest.fn()

        await paramsMiddleware.validateParamPokemonName(req, res, next)
        expect(true).toBe(true)
    })

    test('Test para params de tipo string', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-customerid': 'SAMSUNG',
                'x-api-version': '1'
            },
            params: 'string'
        }

        try {
            await paramsMiddleware.validateParamPokemonName(req)
            expect(true).toBe(false)
        } catch (error) {
            expect(error.message).toEqual('No se encuentra el objeto params en la solicitud')
            expect(error.statusCode).toEqual(403)
        }
    })

    test('Test para params vacio', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-customerid': 'SAMSUNG',
                'x-api-version': '1'
            },
            params: {}
        }

        try {
            await paramsMiddleware.validateParamPokemonName(req)
            expect(true).toBe(false)
        } catch (error) {
            expect(error.message).toEqual('No se encuentra el parámetro pokemonName en la solicitud o es inválido')
            expect(error.statusCode).toEqual(403)
        }
    })

    test('Test para params con espacios en blanco', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-customerid': 'SAMSUNG',
                'x-api-version': '1'
            },
            params: {
                pokemonName: ' charmander'
            }
        }

        try {
            await paramsMiddleware.validateParamPokemonName(req)
            expect(true).toBe(false)
        } catch (error) {
            expect(error.message).toEqual('El parámetro pokemonName posee espacios en blanco al inicio y/o final de la cadena')
            expect(error.statusCode).toEqual(403)
        }
    })
})

describe('Middleware headers test', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })

    test('Test para headers correctos', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-customerid': 'SAMSUNG',
                'x-api-version': '1'
            }
        }

        const res = jest.fn()
        const next = jest.fn()

        await headersMiddleware.validateHeaderMiddleware(req, res, next)
        expect(true).toBe(true)
    })

    test('Test para headers vacios', async () => {
        const req = {
            headers: {}
        }

        try {
            await headersMiddleware.validateHeaderMiddleware(req)
            expect(true).toBe(false)
        } catch (error) {
            expect(error.message).toEqual('No se encuentra el header x-commerce en la solicitud')
            expect(error.statusCode).toEqual(400)
        }
    })

    test('Test para headers sin x-customerid', async () => {
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'x-usrtx': '545454',
                'x-channel': 'WL360',
                'x-country': 'CR',
                'x-commerce': 'IXC',
                'x-api-version': '1'
            }
        }

        try {
            await headersMiddleware.validateHeaderMiddleware(req)
            expect(true).toBe(false)
        } catch (error) {
            expect(error.message).toEqual('No se encuentra el header x-customerid en la solicitud')
            expect(error.statusCode).toEqual(400)
        }
    })
})
