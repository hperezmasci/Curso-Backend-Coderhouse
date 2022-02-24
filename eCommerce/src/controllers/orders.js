import ordersService from '../services/orders.js'

async function getOrders(req, res) {
    try {
        //const prods = await productsService.getProducts()
        //return res.send(prods)
        const username = req.username
        const orders = await ordersService.getOrders(username)
        return res.send(orders)
    }
    catch (e) {
        console.error(`controller.orders.getOrders: ${e}`)
        return res.status(500).send({error: 'Error getting orders'})
    }
}

async function createOrder(req, res) {
    try {
        const username = req.username
        const order = await ordersService.createOrder(username)
        return res.send(order)
    }
    catch (e) {
        console.error(`controller.orders.createOrder: ${e}`)
        return res.status(500).send({error: 'Error creating order'})
    }
}

export default {
    getOrders,
    createOrder
}
