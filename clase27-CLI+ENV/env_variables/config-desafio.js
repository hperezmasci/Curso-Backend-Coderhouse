// setear variables de entorno en powershell para probar esto:
// $env:VARIABLE = "valor"

const config = {
    MODO: process.env.MODO || 'prod',
    PUERTO: process.env.PUERTO ? parseInt(process.env.PUERTO) : 0,
    DEBUG: process.env.DEBUG ? process.env.DEBUG === 'true' : false
}

module.exports = config