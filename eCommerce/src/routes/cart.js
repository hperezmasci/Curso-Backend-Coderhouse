import { Router } from 'express';

import cartController from '../controllers/cart.js'
import authController from '../controllers/auth.js'

const auth = authController.auth

const cartsRouter = new Router()

cartsRouter
    .get('/', auth, cartController.getCart)
    .post('/products', auth, cartController.addProduct)
    .put('/products/:id', auth, cartController.updateProduct)
    .delete('/products/:id', auth, cartController.removeProduct)
    .delete('/products', auth, cartController.removeProducts)

export default cartsRouter

