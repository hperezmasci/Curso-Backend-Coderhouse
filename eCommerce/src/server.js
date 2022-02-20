import express from 'express'
import { createServer } from 'http'

import cfg from './config.js'
import authRouter from './routes/auth.js'

const app = express()

app.use(express.json())
app.use(authRouter)

const httpServer = createServer(app)    // nuevo server http, reemplazando el de express

const connectedServer = httpServer.listen(cfg.server.port, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', cfg.server.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))