const express = require('express')

const config = require('./config')

const app = express()

app.get('/', (req, res) => {
    res.send('Bienvenido')
})

app.listen(config.PORT, config.HOST, () => {
    console.log(`Aplicación corriendo en http://${config.HOST}:${config.PORT}`)
})