import MessagesDao from '../daos/MessagesMongoDB.js'

let socket = null
let ioServer = null
const messages = MessagesDao.getInstance();

function setSocket(s) {
    socket = s
}

function setIOServer(io) {
    ioServer = io
}

async function sendMessages() {
    try {
        socket.emit('messages', await messages.getAll())
    }
    catch (err) {throw new Error(`controllers.messages.send: ${err}`)}
}

function setMessagesHandler() {
    socket.on('message', async (message) => {
        try {
            if (!message.mail) return false
            await messages.save(message)
            ioServer.sockets.emit('messages', await messages.getAll())
        }
        catch (err) {throw new Error(`controllers.messages.messageHandler: ${err}`)}
    })
}

export default {
    setSocket,
    setIOServer,
    sendMessages,
    setMessagesHandler
}