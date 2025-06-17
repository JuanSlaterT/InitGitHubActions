// api/linkedin-callback.ts
const axios = require('axios')

async function handler(req, res) {
    const {code} = req.query

    if (!code) {
        return res.status(400).json({error: 'Falta el código en el callback'})
    }

    try {
        // 1. Intercambiar el código por un access_token
        const tokenResp = await axios.post(
            'https://www.linkedin.com/oauth/v2/accessToken',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET
            }),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )

        const accessToken = tokenResp.data.access_token
        console.log('✅ Access token obtenido:', accessToken)

        // 2. Obtener información del usuario (opcional)
        const meResp = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {Authorization: `Bearer ${accessToken}`}
        })

        const userInfo = meResp.data
        console.log('✅ Usuario autenticado:', userInfo.name)

        // 3. Datos del certificado
        const certId = `POC-${Date.now()}`
        const certUrl = `https://mi-app-poc.com/verify/${certId}`
        const certName = 'Certificado POC'
        const issuerName = 'Mi Compañía de Prueba'
        const currentDate = new Date()
        const issueMonth = currentDate.getMonth() + 1
        const issueYear = currentDate.getFullYear()

        // 4. Username de LinkedIn
        const linkedinUsername = 'me'

        // 5. Construir la URL para agregar el certificado en LinkedIn
        const linkedinCertUrl = new URL(`https://www.linkedin.com/in/${linkedinUsername}/edit/forms/certification/new/`)
        linkedinCertUrl.searchParams.append('certId', certId)
        linkedinCertUrl.searchParams.append('certUrl', certUrl)
        linkedinCertUrl.searchParams.append('isFromA2p', 'true')
        linkedinCertUrl.searchParams.append('issueMonth', issueMonth.toString())
        linkedinCertUrl.searchParams.append('issueYear', issueYear.toString())
        linkedinCertUrl.searchParams.append('name', certName)
        // linkedinCertUrl.searchParams.append("organizationId", "TU_ORG_ID"); // opcional

        console.log('✅ URL de certificación generada:', linkedinCertUrl.toString())

        // 6. Enviar la URL al frontend para redirigir desde allá
        return res.status(200).json({
            success: true,
            redirectUrl: linkedinCertUrl.toString(),
            user: {
                name: userInfo.name,
                email: userInfo.email
            },
            cert: {
                name: certName,
                id: certId,
                url: certUrl,
                issuer: issuerName,
                issueMonth,
                issueYear
            }
        })
    } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message)
        return res.status(500).json({error: 'Error en el proceso'})
    }
}

module.exports = {handler}
