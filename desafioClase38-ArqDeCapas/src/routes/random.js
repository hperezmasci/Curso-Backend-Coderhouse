import { json, urlencoded, Router } from 'express'
import randomController from '../controllers/random.js'

const randomRouter = new Router()

randomRouter.use(json())
randomRouter.use(urlencoded({extended: true}))

randomRouter.get('/', randomController.getRandom)

export default randomRouter