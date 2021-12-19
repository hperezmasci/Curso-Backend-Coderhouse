import { json, urlencoded, Router } from 'express'
import { fork } from 'child_process'

const randomRouter = new Router()

randomRouter.use(json())
randomRouter.use(urlencoded({extended: true}))

randomRouter.get('/', (req, res) => {
    let { cant } = req.query
    if (cant === undefined) cant = 100000000

    const forked = fork('./src/genRandom.js')
    
    forked.on('message', msg => {
        if (msg == 'done') {
            // child inicializado => mando parámetro para disparar cálculo
            forked.send(cant)
        }
        else {
            // respondió con el cálculo
            res.send(msg)
        }
    })
})

export default randomRouter