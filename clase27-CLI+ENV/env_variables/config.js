// setear variables de entorno en powershell para probar esto:
// $env:VARIABLE = "valor"

const config = {
    NODE_ENV: process.env.NODE_ENV || 'delevopment',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '8080'
}

module.exports = config