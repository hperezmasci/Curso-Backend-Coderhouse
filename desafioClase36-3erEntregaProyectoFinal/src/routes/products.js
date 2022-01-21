import { Router, json, urlencoded } from 'express';
import {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct,
} from '../api/products.js'

const administrador = true

const productsRouter = new Router()

productsRouter.use(json())
productsRouter.use(urlencoded({extended: true}))

productsRouter
    .get('/', getProducts)
    .get('/:id', getProduct)
    .post('/', checkPermission, createProduct)
    .put('/:id', checkPermission, updateProduct)
    .delete('/:id', checkPermission, deleteProduct)


// XXX Esto es de juguete
function checkPermission(req, res, next)
{
    if (!administrador) {
        res.status(403).send({error: -1, descripcion: `ruta ${req.path} método ${req.method} no autorizada`})
    }
    else next()
}
export default productsRouter

