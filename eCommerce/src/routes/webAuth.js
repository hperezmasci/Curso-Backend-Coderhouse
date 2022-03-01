import { Router } from 'express'
import authController from '../controllers/webAuth.js'

const authRouter = new Router()

// sessions
authController.init(authRouter)

// endpoints
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.isAuthenticated, authController.logout)

export default authRouter