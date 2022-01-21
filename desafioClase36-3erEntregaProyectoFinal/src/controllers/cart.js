import cartService from '../services/cart.js'

async function addProduct(req, res) {
    try {
        console.log(req.username, req.body)
        const username = req.username
        const productId = req.body.id
        const cart = await cartService.addProduct(username, productId)
        res.render('cart', {username, cart})
    }
    catch (err) {throw new Error(`addProduct: ${err}`)}
}

async function getCart(req, res) {
    try {
        const username = req.username
        const cart = await cartService.getCart(username)
        res.render('cart', {username, cart})
    }
    catch (err) {throw new Error(`getCart: ${err}`)}
}

async function processCart(req, res) {
    try {
        const username = req.username
        const cart = await cartService.getCart(username)
        
        if (req.body.removeItem) {
            // llamar a servicio para quitar item y
            // renderear otra vez el carrito una vez que quité el item
            console.log(`XXX remover item ${req.body.removeItem}`)
            res.render('cart', {username, cart})
            return
        }
        else if (req.body.action == 'purchase') {
            // llamar a servicio para compra, que además vacía el carrito
            // ver qué renderear
            console.log(`XXX purchase!`)
            res.render('cart', {username, cart})
            return
        }
        // no debería llegar aca
        res.render('cart', {username, cart})
    }
    catch (err) {throw new Error(`processCart: ${err}`)}
}


export default {
    getCart,
    addProduct,
    processCart
}