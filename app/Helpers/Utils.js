const logger = require('../../config/logger')
const {buildObjectForLogs} = require('./buildObjectForLogs')

function logFormat(dataOfLog) {
    const {type, file, headers, _function, message, data} = dataOfLog
    switch (type) {
        case 'info':
            if (typeof data !== 'string') {
                logger.info(
                    `type: INFO   file: ${file}   function: ${_function}   detail: ${JSON.stringify(
                        buildObjectForLogs({
                            loggerName: file,
                            level: 'INFO',
                            country: headers?.['x-country'],
                            customerId: headers?.['x-customerid'],
                            message,
                            function: _function,
                            data,
                            file
                        })
                    )}`
                )
            } else {
                logger.info(
                    `type: INFO   file: ${file}   function: ${_function}   message: ${JSON.stringify(
                        buildObjectForLogs({
                            loggerName: file,
                            level: 'INFO',
                            country: headers?.['x-country'],
                            customerId: headers?.['x-customerid'],
                            message,
                            function: _function,
                            data,
                            file
                        })
                    )}`
                )
            }
            break
        case 'error':
            logger.error(
                `type: ERROR   file: ${file}   function: ${_function}   errorDetail: ${JSON.stringify(
                    buildObjectForLogs({
                        loggerName: file,
                        level: 'ERROR',
                        country: headers?.['x-country'],
                        customerId: headers?.['x-customerid'],
                        message,
                        function: _function,
                        data,
                        file
                    })
                )}`
            )
            break
    }
}
module.exports = {
    logFormat
}
