import { Router } from 'express'

import cfgController from '../controllers/cfg.js'

const cfgRouter = new Router()

cfgRouter.get('/', cfgController.showConfig) 

export default cfgRouter