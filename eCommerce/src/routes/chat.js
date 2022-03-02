import { Router } from 'express'

import chatController from '../controllers/chat.js'

const chatRouter = new Router()

chatRouter.get('/', chatController.showChat)

export default chatRouter