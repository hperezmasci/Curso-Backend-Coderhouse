import logger from '../logger.js'
import cartService from '../services/cart.js'

async function addProduct(req, res) {
    try {
        const username = req.username
        const productId = req.body.id
        let cart = await cartService.getCart(username)
            cart = await cartService.addProduct(cart, productId)
        const products = cart.products
        res.render('cart', {username, products})
    }
    catch (err) {logger.error(`controllers.cart.addProduct: ${err}`)}
}

async function getCart(req, res) {
    try {
        const username = req.username
        const cart = await cartService.getCart(username)
        const products = cart.products
        res.render('cart', {username, products})
    }
    catch (err) {logger.Error(`controllers.cart.getCart: ${err}`)}
}

async function processCart(req, res) {
    try {
        const username = req.username
        const productId = req.body.removeItem
        let cart = await cartService.getCart(username)
        let products = []
        
        if (productId) {
            cart = await cartService.removeProduct(cart, productId)
            cart = await cartService.getCart(username)
            products = cart.products
            res.render('cart', {username, products})
            return
        }
        else if (req.body.action == 'purchase') {
            products = cart.products
            await cartService.purchase(cart, username)
            res.render('purchase', {username, products})
            return
        }
        else if (req.body.action == 'emptyCart') {
            await cartService.emptyCart(cart, username)
            cart = await cartService.getCart(username)
            products = cart.products
            res.render('cart', {username, products})
            return
        }
        console.error(`controllers.cart.processCart: unknown action ${req.body.action}`)
        products = []
        res.render('cart', {username, products})
        return
    }
    catch (err) {logger.error(`controllers.cart.processCart: ${err}`)}
}


export default {
    getCart,
    addProduct,
    processCart
}