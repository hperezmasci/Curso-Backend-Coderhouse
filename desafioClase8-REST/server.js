import express, { json, urlencoded } from 'express';
import Contenedor from './ContenedorAsync.js';

const cont = new Contenedor('productos.txt');

const { Router } = express

const router = new Router()

router.use(json())
router.use(urlencoded({extended: true}))

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
        if (typeof product === 'undefined')
            res.status(400).send({error : 'producto no encontrado' })
        else
            res.send(product)
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
        cont.save(req.body)
        res.json(req.body)
    }
    catch (err) {throw new Error(`post: ${err}`)}
})

router.delete('/:id', async (req, res) => {
    try {
        const product = await cont.deleteById(req.params.id)
        res.send(product)
    }
    catch (err) {throw new Error(`get: ${err}`)}
})

const app = express()

app.use('/api/productos', router)

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({error: `Internal server error: ${err}`})
})
  
app.use(express.static('public'))

const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))