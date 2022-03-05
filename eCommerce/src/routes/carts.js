import { Router } from 'express';

import cartsController from '../controllers/carts.js'
import authController from '../controllers/auth.js'

const auth = authController.auth

const cartsRouter = new Router()

cartsRouter
    .get('/', auth, cartsController.getCart)
    .post('/', auth, cartsController.addProduct)
    .put('/:id', auth, cartsController.updateProduct)
    .delete('/:id', auth, cartsController.removeProduct)
    .delete('/', auth, cartsController.removeProducts)

export default cartsRouter

