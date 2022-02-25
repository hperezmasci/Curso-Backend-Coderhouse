import { Router } from 'express';

import cartController from '../controllers/cart.js'
import authController from '../controllers/auth.js'

const auth = authController.auth

const cartsRouter = new Router()

cartsRouter
    .get('/', auth, cartController.getCart)
    .post('/', auth, cartController.addProduct)
    .put('/:id', auth, cartController.updateProduct)
    .delete('/:id', auth, cartController.removeProduct)
    .delete('/', auth, cartController.removeProducts)

export default cartsRouter

