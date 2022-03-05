import cfgService from '../services/cfg.js'

function showConfig(req, res) {
    res.render('cfg.hbs', {cfg: cfgService.getConfig()})
}

export default {
    showConfig
}