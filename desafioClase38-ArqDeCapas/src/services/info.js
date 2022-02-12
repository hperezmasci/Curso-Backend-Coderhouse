function serverInfo() {
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

export default {
    serverInfo
}