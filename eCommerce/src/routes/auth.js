import { Router } from 'express'

import authController from '../controllers/auth.js'

const authRouter = new Router()

authRouter
    .post('/usuarios', authController.register)
    .post('/tokens', authController.createToken)

export default authRouter