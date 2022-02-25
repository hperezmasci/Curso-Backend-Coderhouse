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
        console.error(`controllers.order.getOrders: ${e}`)
        return res.status(500).send({error: 'Error getting order from cart'})
    }
}

async function createOrder(req, res) {
    try {
        const username = req.username
        const address = req.body.address
        const order = await ordersService.createOrder(username, address)
        return res.send(order)
    }
    catch (e) {
        const code = e.message === 'BAD_PARAM' ? 400 : 404
        if (ordersService.Errors[e.message])
            return res.status(code).json({error: ordersService.Errors[e.message]})
        console.error(`controllers.order.createOrder: ${e}`)
        return res.status(500).send({error: 'Error creating order in cart'})
    }
}

export default {
    getOrders,
    createOrder
}
