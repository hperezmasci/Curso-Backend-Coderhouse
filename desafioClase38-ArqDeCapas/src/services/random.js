import { fork } from 'child_process'

function forkRandomProcess(cant, cb) {
    if (cant === undefined) cant = 100000000

    const forked = fork('./src/services/randomProcess.js')

    forked.on('message', msg => {
        if (msg == 'done') {
            // child inicializado => mando parámetro para disparar cálculo
            forked.send(cant)
        }
        else {
            // respondió con el cálculo
            cb(msg)
        }
    })
}

export default {
    forkRandomProcess
}