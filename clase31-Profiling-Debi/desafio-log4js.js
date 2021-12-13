const express = require('express')
const loggerModule = require('./log4js-module')

const app = express()
const logger = loggerModule(process.env.NODE_ENV)

app.get('/suma', (req, res) => {
    let {a, b} = req.query

    const isValidA = !isNaN(a)
    if (!isValidA) {
        logger.error(`Se recibio nro no valido ${a}`)
        return res.status(400).send(`Se recibio nro no valido ${a}`)
    }
    const isValidB = !isNaN(b)
    if (!isValidB) {
        logger.error(`Se recibio nro no valido ${b}`)
        return res.status(400).send(`Se recibio nro no valido ${b}`)
    }
    const suma =  parseInt(a) + parseInt(b)

    logger.info('operacion exitosa!')

    return res.send(`El resultado es ${suma}`)
})

app
    .listen(8080, () => console.log('Running'))
    .on('error', logger.error.bind(logger))