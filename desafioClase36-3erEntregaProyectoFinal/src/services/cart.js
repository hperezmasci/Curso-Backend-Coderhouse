import CartsDao from '../daos/CartsMongoDB.js'
import ProductsDao from '../daos/ProductsMongoDB.js'
import UsersDao from '../daos/UsersMongoDB.js'
import sendMail from '../messaging/mail.js'
import sendMsg from '../messaging/message.js'
import conf from '../config.js'

// XXX FIXME: probablemente sea mejor que llame a services product en lugar del DAO aquí
const Carts = CartsDao.getInstance()
const Products = ProductsDao.getInstance()
const Users = UsersDao.getInstance()

async function getCart(username) {
    try {
        let cart = await Carts.getByUsername(username)
        if (!cart) {
            cart = await Carts.save({
                'username': username,
                'timestamp': Date.now(),
                'products': []
            })
        }
        return cart
    }
    catch (err) {throw new Error(`services.cart.getCart: ${err}`)}
}

// XXX TODO: manejar stock???
async function addProduct(cart, productId) {
    try {
        const prod = await Products.getById(productId)
        if (prod === null || prod === undefined)
            return new Error('product not found')
    
        cart.products.push(prod)
        await Carts.update(cart)
        return cart
    }
    catch (err) {throw new Error(`services.cart.addProduct: ${err}`)}
}

async function removeProduct(cart, productId) {
    try {
        const idx = cart.products.findIndex(p => p.id == productId)
        if (idx == -1) {
            return new Error('Product not found')
        }
        cart.products.splice(idx, 1)
        await Carts.update(cart)
        return
    }
    catch (err) {throw new Error(`services.cart.removeProduct: ${err}`)}
}

async function emptyCart(cart) {
    try {
        cart.products = []
        await Carts.update(cart)
        return
    }
    catch (err) {throw new Error(`services.cart.emptyCart: ${err}`)}
}

async function purchase(cart, username) {
    try {
        const user = await Users.getByUsername(username)
        const subject = `Nuevo pedido de ${user.name} ${username}`
        await sendMail({
            from: 'eCommerce@yopmail.com',
            to: conf.adminMail,
            subject,
            text: JSON.stringify(cart.products,null,2)
        })
        await sendMsg(conf.adminPhone, subject, 'whatsapp')
        await sendMsg(user.phone, `eCommerce: Hola ${user.name}, su pedido ha sido recibido y se está procesando.`, 'sms')
        await emptyCart(cart) 
        return
    }
    catch (err) {throw new Error(`services.cart.purchase: ${err}`)}
}

export default {
    getCart,
    addProduct,
    removeProduct,
    emptyCart,
    purchase
}