import { Router } from 'express';

import ordersController from '../controllers/orders.js'
import authController from '../controllers/auth.js'

const auth = authController.auth

const ordersRouter = new Router()

ordersRouter
    .get('/', auth, ordersController.getOrders)
    .post('/', auth, ordersController.createOrder)

export default ordersRouter

