import infoService from '../services/info.js'

function getInfo(req, res) {
    res.render('info.handlebars', infoService.serverInfo())
}

export default {
    getInfo
}
