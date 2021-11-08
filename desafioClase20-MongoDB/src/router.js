import express, { json, urlencoded } from 'express';
import {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct,
    createCart, deleteCart, getProductsFromCart, addProductToCart, deleteProductFromCart
} from './api.js'

const administrador = true

const { Router } = express

const productRouter = new Router()
const cartRouter = new Router()

productRouter.use(json())
productRouter.use(urlencoded({extended: true}))

cartRouter.use(json())
cartRouter.use(urlencoded({extended: true}))

productRouter
    .get('/', getProducts)
    .get('/:id', getProduct)
    .post('/', checkPermission, createProduct)
    .put('/:id', checkPermission, updateProduct)
    .delete('/:id', checkPermission, deleteProduct)

cartRouter
    .post('/', createCart)
    .delete('/:id', deleteCart)
    .get('/:id/productos', getProductsFromCart)
    .post('/:id/productos', addProductToCart)
    .delete('/:id/productos/:id_prod', deleteProductFromCart)

function checkPermission(req, res, next)
{
    if (!administrador) {
        res.status(403).send({error: -1, descripcion: `ruta ${req.path} método ${req.method} no autorizada`})
    }
    else next()
}
export { productRouter, cartRouter }

