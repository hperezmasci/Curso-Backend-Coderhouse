import { Router } from 'express'

import authController from '../controllers/webAuth.js'
import chatController from '../controllers/chat.js'

const chatRouter = new Router()

chatRouter.get('/', /*authController.isAuthenticated,*/ chatController.showChat)
chatRouter.get('/:email', /*authController.isAuthenticated,*/ chatController.showChat)


export default chatRouter