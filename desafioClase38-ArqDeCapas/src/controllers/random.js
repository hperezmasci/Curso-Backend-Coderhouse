import randomService from '../services/random.js'

/*
 * Por algún motivo en forkRandomProcess no puedo pasar como callback res.send
 * Como el que debe hacer el send es la capa controller (y no la services), le paso
 * un callback que recibe el mensaje y llama a res.send(mensaje). Esto tiene que ser
 * un closure porque no puedo pasarle res a forkRandomProcess para no romper las capas
*/
function mkCb(res) {
    return function(msg) {
        return res.send(msg)
    }
}

function getRandom(req, res) {
    const { cant } = req.query
    const cb = mkCb(res)
    randomService.forkRandomProcess(cant, cb)
}

export default {
    getRandom
}