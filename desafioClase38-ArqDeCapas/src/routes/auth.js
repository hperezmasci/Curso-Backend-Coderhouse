import { Router } from 'express'
import authController from '../controllers/auth.js'

const authRouter = new Router()

// sessions
authController.init(authRouter)

// endpoints
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.isAuthenticated, authController.logout)
authRouter.get('/', authController.isAuthenticated, authController.getIndex)

export default authRouter