function buildObjectForLogs(fullData) {
    return {
        country: fullData.country ?? '',
        customerId: fullData.customerId ?? '',
        environment: process.env.NODE_ENV,
        loggerName: fullData.file,
        timestamp: new Date().getTime(),
        level: fullData.level,
        function: fullData.function,
        message: fullData.message,
        data: fullData.data,
        resource: {
            'service.name': process.env.SERVICE_MS_LINKEDIN || 'MSLINKEDIN',
            'service.version': process.env.VERSION || '1.0.0'
        }
    }
}

module.exports = {
    buildObjectForLogs
}
