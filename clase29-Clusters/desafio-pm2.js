const express = require('express')

console.log(`worker pid ${process.pid}`)

const app = express()

const PORT = process.argv[2] || 8092

app.get('/', (req, res) => {
    return res.send(`Servidor escuchando en puerto ${PORT} - PID ${process.pid}`)
})

app
    .listen(PORT, () => console.log(`Servidor express en ${PORT} - PID ${process.pid}`))
    .on('error', err => console.log(err))