const config = require('./config-desafio')

console.log(
    {
        modo: config.MODO,
        puerto: config.PUERTO,
        debug: config.DEBUG
    }
)