import { Router } from 'express'
import infoController from '../controllers/info.js'

const infoRouter = new Router()

infoRouter.get('/', infoController.getInfo)

export default infoRouter