import express from 'express'
import mongoose from 'mongoose'
import winston from 'winston'
import compression from 'compression'

import { fn } from './config/database'

const app = express()
app.use(compression())

const PORT = process.argv[2] || 3000

const init = async () => {
    require('dotenv').config()
    const database = fn(process.env)
    mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`)

    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            new winston.transports.Console({level: 'verbose'})
        ]
    })

    app.get('', (req, res) => {
        return res.json({date: new Date()})
    })

    app
        .listen(PORT, () => logger.info(`Aplicación corriendo en el puerto ${PORT}`))
        .on('error', err => logger.error(err))
}

init()