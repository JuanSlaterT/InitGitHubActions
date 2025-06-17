const Utils = require('../app/Helpers/Utils')
const logger = require('../config/logger')
const {buildObjectForLogs} = require('../app/Helpers/buildObjectForLogs')

const mockDate = new Date('2024-01-01T00:00:00').getTime()

describe('Utils test unitario', () => {
    beforeEach(() => {
        logger.info = jest.fn()
        global.Date = jest.fn(() => ({
            getTime: jest.fn(() => mockDate)
        }))
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('Llamada a función logFormat', async () => {
        process.env.NODE_ENV = 'test'
        process.env.SERVICE_POKEMON = 'test'
        process.env.VERSION = '1'
        const headers = {}

        const fullData = {
            environment: process.env.NODE_ENV,
            level: 'INFO',
            message: '',
            resource: {
                'service.name': process.env.SERVICE_BFF,
                'service.version': process.env.VERSION
            }
        }

        const data = ''
        const detail = buildObjectForLogs(fullData)

        Utils.logFormat('info', 'file', 'function', headers, '', data)
        expect(logger.info).toHaveBeenCalledWith(`type: info   headers: No aplican headers   file: file   function: function    detail: ${JSON.stringify(detail)}   data: `)
    })
})
