const axiosConf = (url, serviceH, country, customerId, commerce, channel, usrtx, apiVersion, route) => ({
    baseUrl: `${process.env[url]}/${route}`,
    option: {
        headers: {
            'Content-Type': 'application/json',
            // HEADER sugerido para mayor seguridad
            service: process.env[serviceH],
            // HEADERS solicitados por el equipo de arquitectura
            'x-country': country,
            'x-customerid': customerId,
            'x-commerce': commerce,
            'x-channel': channel,
            'x-usrtx': usrtx,
            'x-api-version': apiVersion
        }
    }
})

module.exports = {axiosConf}
