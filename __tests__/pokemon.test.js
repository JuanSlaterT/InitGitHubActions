const request = require('supertest')
const app = require('../app')
const axios = require('axios')

jest.mock('axios')

describe('Pokemon tests - Obtener pokemon por nombre', () => {
    beforeAll(() => {
        jest.restoreAllMocks()
    })
    afterEach(() => {
        axios.get.mockReset()
    })

    test('Llamada a endpoint /pokemon/:pokemonName con datos correctos', async () => {
        process.env.POKEMON_URL = 'http://xxxx:xxxx/api/v2'
        process.env.SERVICE_POKEMON = 'POKEMON'

        const headers = {
            'Content-Type': 'application/json',
            'x-country': 'CR',
            'x-customerid': 'SAMSUNG',
            'x-commerce': 'IXC',
            'x-channel': 'WL360',
            'x-usrtx': '123456789',
            'x-api-version': '1',
            service: 'POKEMON'
        }

        const expectedResponse = {
            pokemon: {
                name: 'charmeleon',
                url: 'https://pokeapi.co/api/v2/pokemon/5/'
            },
            types: [
                {
                    slot: 1,
                    type: {
                        name: 'fire',
                        url: 'https://pokeapi.co/api/v2/type/10/'
                    }
                }
            ]
        }

        axios.get.mockResolvedValueOnce({
            data: expectedResponse
        })

        const res = await request(app)
            .get('/api/pokemon/byName/ditto')
            .set('service', 'POKEMON')
            .set('x-country', 'CR')
            .set('x-customerid', 'SAMSUNG')
            .set('x-commerce', 'IXC')
            .set('x-channel', 'WL360')
            .set('x-usrtx', '123456789')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://xxxx:xxxx/api/v2/pokemon-form/ditto', {headers: headers})
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({result: expectedResponse})
    })

    test('Llamada a endpoint /pokemon/:pokemonName con falla en la llamada a la API', async () => {
        process.env.POKEMON_URL = 'http://xxxx:xxxx/api/v2'

        axios.get.mockRejectedValueOnce(new Error('Network Error'))

        const headers = {
            'Content-Type': 'application/json',
            'x-country': 'CR',
            'x-customerid': 'SAMSUNG',
            'x-commerce': 'IXC',
            'x-channel': 'WL360',
            'x-usrtx': '123456789',
            'x-api-version': '1',
            service: 'POKEMON'
        }

        const res = await request(app)
            .get('/api/pokemon/byName/ditto')
            .set('service', 'POKEMON')
            .set('x-country', 'CR')
            .set('x-customerId', 'SAMSUNG')
            .set('x-commerce', 'IXC')
            .set('x-channel', 'WL360')
            .set('x-usrtx', '123456789')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://xxxx:xxxx/api/v2/pokemon-form/ditto', {headers: headers})
        expect(res.status).toEqual(500)
    })

    test('Llamada a endpoint /pokemon con datos correctos', async () => {
        process.env.POKEMON_URL = 'http://xxxx:xxxx/api/v2'
        process.env.SERVICE_POKEMON = 'POKEMON'

        const headers = {
            'Content-Type': 'application/json',
            'x-country': 'CR',
            'x-customerid': 'SAMSUNG',
            'x-commerce': 'IXC',
            'x-channel': 'WL360',
            'x-usrtx': '123456789',
            'x-api-version': '1',
            service: 'POKEMON'
        }

        const expectedResponse = {
            result: {
                pokemon_entries: [
                    {
                        entry_number: 1,
                        pokemon_species: {
                            name: 'bulbasaur',
                            url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
                        }
                    },
                    {
                        entry_number: 2,
                        pokemon_species: {
                            name: 'ivysaur',
                            url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
                        }
                    },
                    {
                        entry_number: 3,
                        pokemon_species: {
                            name: 'venusaur',
                            url: 'https://pokeapi.co/api/v2/pokemon-species/3/'
                        }
                    }
                ]
            }
        }

        axios.get.mockResolvedValueOnce({
            data: expectedResponse
        })

        const res = await request(app)
            .get('/api/pokemon')
            .set('service', 'POKEMON')
            .set('x-country', 'CR')
            .set('x-customerid', 'SAMSUNG')
            .set('x-commerce', 'IXC')
            .set('x-channel', 'WL360')
            .set('x-usrtx', '123456789')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://xxxx:xxxx/api/v2/pokedex/kanto', {headers: headers})
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({result: expectedResponse})
    })

    test('Llamada a endpoint /pokemon con falla en la llamada a la API', async () => {
        process.env.POKEMON_URL = 'http://xxxx:xxxx/api/v2'

        axios.get.mockRejectedValueOnce(new Error('Network Error'))

        const headers = {
            'Content-Type': 'application/json',
            'x-country': 'CR',
            'x-customerid': 'SAMSUNG',
            'x-commerce': 'IXC',
            'x-channel': 'WL360',
            'x-usrtx': '123456789',
            'x-api-version': '1',
            service: 'POKEMON'
        }

        const res = await request(app)
            .get('/api/pokemon')
            .set('service', 'POKEMON')
            .set('x-country', 'CR')
            .set('x-customerId', 'SAMSUNG')
            .set('x-commerce', 'IXC')
            .set('x-channel', 'WL360')
            .set('x-usrtx', '123456789')
            .set('x-api-version', '1')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://xxxx:xxxx/api/v2/pokedex/kanto', {headers: headers})
        expect(res.status).toEqual(500)
    })
})
