import { Router } from 'express'

const infoRouter = new Router()

function infoParams() {
    const info = {
        inputArgs: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        resindentSetSize: process.memoryUsage().rss,
        execPath: process.execPath,
        processId: process.pid,
        cwd: process.cwd()
    }
    return {info}
}

infoRouter.get('/', (req, res) => {
    res.render('info.handlebars', infoParams())
})

export default infoRouter