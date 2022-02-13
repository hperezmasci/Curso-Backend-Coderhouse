import ProductsDao from '../daos/ProductsMongoDB.js'

let socket = null
let ioServer = null
const products = ProductsDao.getInstance();

function setSocket(s) {
    socket = s
}

function setIOServer(io) {
    ioServer = io
}

async function sendProducts() {
    try {
        socket.emit('products', await products.getAll())
    }
    catch (err) {throw new Error(`controllers.products.send: ${err}`)}
}

function setProductsHandler() {
    socket.on('product', async (product) => {
        try {
            await products.save(product)
            ioServer.sockets.emit('products', await products.getAll())
        }
        catch (err) {
            throw new Error(`controllers.products.productHandler: ${err}`)}
    })
}

export default {
    setSocket,
    setIOServer,
    sendProducts,
    setProductsHandler
}