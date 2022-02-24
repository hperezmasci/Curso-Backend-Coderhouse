import OrdersDao from '../daos/OrdersMongoDB.js'
import cartService from './cart.js'

const Errors = {
}

const Orders = OrdersDao.getInstance()

async function getOrders(username) {
    const orders = await Orders.getAllByUsername(username)
    return orders
}

async function createOrder(username) {
    const cart = await cartService.getCart(username)

    const order = await Orders.save({
        'username': username,
        'timestamp': Date.now(),
        'products': cart.products,
        'status': 'generada',
        'email': username
    })

    return order
}

export default {
    Errors,
    getOrders,
    createOrder
}