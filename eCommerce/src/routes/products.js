import { Router } from 'express';

import productsController from '../controllers/products.js'
import authController from '../controllers/auth.js'

const auth = authController.auth
const adminAuth = authController.adminAuth

const productsRouter = new Router()

productsRouter
    .get('/', auth, productsController.getProducts)
    .get('/:id', auth, productsController.getProduct)
    .post('/', auth, productsController.uploadImg, productsController.createProduct)
    .put('/:id', adminAuth, productsController.updateProduct)
    .delete('/:id', adminAuth, productsController.deleteProduct)

export default productsRouter

