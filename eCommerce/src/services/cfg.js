import cfg from '../config.js'

function getConfig() {
    // limito esto a unos pocos parámetros
    // no tengo que mostrar secrets, passwords, etc
    const config = JSON.parse(JSON.stringify(cfg))
    config.auth.secret = 'HIDDEN'
    config.auth = JSON.stringify(config.auth)
    config.db.cnxStr = 'HIDDEN'
    config.db = JSON.stringify(config.db)
    config.server = JSON.stringify(config.server)
    if (config.notifications.auth) config.notifications.auth = 'HIDDEN'
    config.notifications = JSON.stringify(config.notifications)
    return config
}

export default {
    getConfig
}
