import { Router } from 'express'

import authController from '../controllers/auth.js'

const authRouter = new Router()

authRouter
    .post('/register', authController.register)
    .post('/login', authController.login)

export default authRouter