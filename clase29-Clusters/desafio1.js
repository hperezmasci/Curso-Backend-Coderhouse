const cluster = require('cluster')
const express = require('express')

const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i=0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
}
else {
    const PORT = 8080
    const app = express()

    app.get('/', (req, res) => {
            res.send(`Sevidor express en PORT ${PORT} - PID ${process.pid}`)
    })

    app
    .listen(PORT, () => {console.log(`Servidor http escuchando en el puerto ${PORT}`)})
    .on("error", error => console.log(`Error en servidor ${error}`))

    console.log(`Worker ${process.pid} started`)
}
