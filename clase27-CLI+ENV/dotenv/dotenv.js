const dotenv = require('dotenv')

dotenv.config()

console.log(`env: ${JSON.stringify(process.env, null, 2)}`)

const frente = process.env.FRENTE
const fondo = process.env.FONDO

console.log({
    frente,
    fondo
})