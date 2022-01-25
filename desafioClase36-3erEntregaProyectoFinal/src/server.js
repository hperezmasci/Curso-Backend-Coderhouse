import cluster from 'cluster'
import http from 'http'
import os from 'os'

import express from 'express'
import exphbs from 'express-handlebars'
import parseArgs from "minimist"

import conf from './config.js'
import webRouter from './routes/web.js'
import productsRouter from './routes/products.js'

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const args = parseArgs(process.argv.slice(2), {default: {port: 8080}})


if (conf.loadBalance && !cluster.isWorker) {
    console.log(`Master ${process.pid} is running`)

    const numCPUs = os.cpus().length
    console.log(`numCPUs: ${numCPUs}`)
    
    for (let i=0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid}) died`)
    })
}
else {
    // express initialization
    const app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('../public'))

    // server-side handlebars
    app.engine('hbs',exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
    app.set('view engine', 'hbs')
    app.set('views', './views')

    // Routers
    app.use(webRouter)
    app.use('/api/products', productsRouter)

    // Server initialization
    const httpServer = http.createServer(app)    // nuevo server http, reemplazando el de express

    // http server
    const connectedServer = httpServer.listen(args.port, () => {
        console.log('Servidor HTTP escuchando en el puerto', args.port)
    })
    connectedServer.on('error', error=>console.log('Error en servidor', error))
}
