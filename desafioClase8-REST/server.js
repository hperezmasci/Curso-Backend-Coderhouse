const express = require('express')
const Contenedor = require('./ContenedorAsync')

const cont = new Contenedor('productos.txt');

const { Router } = express

const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', async (req, res) => {
    try {
        const products = await cont.getAll()
        res.send(products)
    }
    catch (err) {throw new Error(`get: ${err}`)}
})

router.get('/:id', async (req, res) => {
    try {
        const product = await cont.getById(req.params.id)
        res.send(product)
        // XXX TODO: error al pedir ID que no existe
    }
    catch (err) {throw new Error(`get: ${err}`)}
})

router.post('/', async (req, res) => {
    try {
        cont.save(req.body)
        res.json(req.body)
    }
    catch (err) {throw new Error(`post: ${err}`)}
})

router.put('/:id', async (req, res) => {
    try {
        await cont.deleteById(req.params.id)
        // XXX TODO: error al pedir ID que no existe
        cont.save(req.body)
        res.json(req.body)
    }
    catch (err) {throw new Error(`post: ${err}`)}
})

router.delete('/:id', async (req, res) => {
    try {
        const product = await cont.deleteById(req.params.id)
        // XXX TODO: error al pedir ID que no existe
        res.send(product)
    }
    catch (err) {throw new Error(`get: ${err}`)}
})

const app = express()

app.use('/api/productos', router)

const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))