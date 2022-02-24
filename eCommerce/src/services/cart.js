import CartsDao from '../daos/CartsMongoDB.js'
import ProductsDao from '../daos/ProductsMongoDB.js'
import UsersDao from '../daos/UsersMongoDB.js'

const Errors = {
    PROD_NOT_FOUND: 'Product not found',
    BAD_PARAM: 'Bad parameter'
}

const Carts = CartsDao.getInstance()
const Products = ProductsDao.getInstance()
const Users = UsersDao.getInstance()

async function getCart(username) {
    let cart = await Carts.getByUsername(username)
    if (!cart) {
        console.log('XXX TODO: falta domicilio de entrega')
        cart = await Carts.save({
            'username': username,
            'timestamp': Date.now(),
            'products': []
        })
    }
    return cart
}

async function addProduct(cart, productId, qty) {
    if (qty === undefined) qty = 1
    if (qty <= 0) throw new Error('BAD_PARAM')

    let prod = null

    const idx = cart.products.findIndex(p => p.id == productId)
    if (idx != -1) {
        prod = cart.products[idx]
        prod.qty += qty
    }
    else {
        prod = await Products.getById(productId)
        if (prod === null || prod === undefined)
            throw new Error('PROD_NOT_FOUND')
        prod.qty = qty
        cart.products.push(prod)
    }

    await Carts.update(cart)
    return cart
}

async function updateProductQty(cart, productId, qty) {
    if (qty === undefined || qty < 0) throw new Error('BAD_PARAM')
    
    if (qty == 0) return removeProduct(cart, productId)

    const idx = cart.products.findIndex(p => p.id == productId)
    if (idx == -1)
        throw new Error('PROD_NOT_FOUND')
    
    cart.products[idx].qty = qty
    await Carts.update(cart)
    return cart
}

async function removeProduct(cart, productId) {
    const idx = cart.products.findIndex(p => p.id == productId)
    if (idx == -1)
        throw new Error('PROD_NOT_FOUND')

    cart.products.splice(idx, 1)
    await Carts.update(cart)
    return cart
}

async function removeProducts(cart) {
    cart.products = []
    await Carts.update(cart)
    return cart
}

export default {
    Errors,
    getCart,
    addProduct,
    updateProductQty,
    removeProduct,
    removeProducts
}