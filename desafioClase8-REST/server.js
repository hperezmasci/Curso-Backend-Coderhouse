const express = require('express')
const Contenedor = require('./ContenedorAsync')

const cont = new Contenedor('productos.txt');

const { Router } = express

const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', (req, res) => {
    res.send('get ok')
})

router.post('/', (req, res) => {
    console.log(req.body)
    cont.save(req.body)
    res.json(req.body)
})

const app = express()

app.use('/api/productos', router)

const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))