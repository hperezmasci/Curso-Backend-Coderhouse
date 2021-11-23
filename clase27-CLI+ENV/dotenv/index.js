const dotenv = require('dotenv')
const path = require('path')

// con esto cargo un set de variables de ambiente que viven en un archivo .env
// e incluso selecciono el set (archivo) con una variable de entorno
dotenv.config({
    path: process.env.MODO === 'byn'
        ? path.resolve(__dirname, 'byn.env')
        : path.resolve(__dirname, 'colores.env')
})

const frente = process.env.FRENTE
const fondo = process.env.FONDO

console.log({
    frente,
    fondo
})