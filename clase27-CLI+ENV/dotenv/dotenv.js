const dotenv = require('dotenv')

dotenv.config()

const frente = process.env.FRENTE
const fondo = process.env.FONDO

console.log({
    frente,
    fondo
})