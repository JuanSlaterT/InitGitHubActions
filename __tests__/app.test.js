const request = require('supertest')
const app = require('../app')
const axios = require('axios')

require('dotenv').config({
    path: './.env'
})

jest.mock('axios')

afterEach(() => {
    axios.post.mockReset()
})

describe('Generic Routes tests', () => {
    test('Llamada correcta a ruta /api/healthcheck', async () => {
        const res = await request(app).get('/api/healthcheck')

        expect(res.status).toEqual(200)
        expect(res.body).toEqual({message: 'Arq-Pokemon', status: 'OK'})
    })

    test('Llamada a ruta no encontrada', async () => {
        const res = await request(app).get('/api/abcd')

        expect(res.status).toEqual(404)
        expect(res.body).toEqual({status: 'ERROR', message: 'Página no encontrada'})
    })
})
