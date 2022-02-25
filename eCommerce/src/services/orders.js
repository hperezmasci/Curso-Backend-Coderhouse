import OrdersDao from '../daos/OrdersMongoDB.js'
import cartService from './cart.js'
import sendMail from '../messaging/mail.js'
import cfg from '../config.js'

const Errors = {
    BAD_PARAM: 'Bad parameter'
}

const Orders = OrdersDao.getInstance()

async function getOrders(username) {
    const orders = await Orders.getAllByUsername(username)
    return orders
}

async function createOrder(username, address) {
    const cart = await cartService.getCart(username)

    // Domicilio de entrega obligatorio
    // (decidí ponerlo aquí que tiene más sentido que en el carrito)
    if (!address) throw new Error('BAD_PARAM')
    
    // Crea orden con carrito vacío => no hace nada
    if (!cart.products.length) return {}

    const order = await Orders.save({
        'username': username,
        'timestamp': Date.now(),
        'products': cart.products,
        'status': 'generada',
        'address': address,
        'email': username
    })

    const subject = `Nuevo pedido de ${username}`
    // no uso await para no bloquear por el envío del mail
    sendMail({
        from: cfg.sender,
        to: username,
        subject,
        text: JSON.stringify(cart.products,null,2)
    })

    if (cfg.notifications) {
        // no uso await para no bloquear por el envío del mail
        sendMail({
            from: cfg.sender,
            to: cfg.admin,
            subject,
            text: JSON.stringify(cart.products,null,2)
        })
    }

    await cartService.removeProducts(cart)

    return order
}

export default {
    Errors,
    getOrders,
    createOrder
}