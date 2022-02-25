import cartService from '../services/cart.js'

async function getCart(req, res) {
    try {
        const username = req.username
        const cart = await cartService.getCart(username)
        return res.send(cart)
    }
    catch (e) {
        console.error(`controllers.cart.getCart: ${e}`)
        return res.status(500).send({error: 'Error getting cart'})
    }
}

async function addProduct(req, res) {
    try {
        const username = req.username
        const productId = req.body.id
        const qty = req.body.qty
        let cart = await cartService.getCart(username)
            cart = await cartService.addProduct(cart, productId, qty)
        return res.send(cart)
    }
    catch (e) {
        const code = e.message === 'BAD_PARAM' ? 400 : 404
        if (cartService.Errors[e.message])
            return res.status(code).json({error: cartService.Errors[e.message]})
        console.error(`controllers.cart.addProduct: ${e}`)
        return res.status(500).send({error: 'Error adding product to cart'})
    }
}

async function updateProduct(req, res) {
    try {
        const username = req.username
        const productId = req.params.id
        const qty = req.body.qty
        let cart = await cartService.getCart(username)
            cart = await cartService.updateProductQty(cart, productId, qty)
        return res.send(cart)
    }
    catch (e) {
        const code = e.message === 'BAD_PARAM' ? 400 : 404
        if (cartService.Errors[e.message])
            return res.status(code).json({error: cartService.Errors[e.message]})
        console.error(`controllers.cart.updateProduct: ${e}`)
        return res.status(500).send({error: 'Error updating product in cart'})
    }
}

async function removeProduct(req, res) {
    try {
        const username = req.username
        const productId = req.params.id
        let cart = await cartService.getCart(username)
            cart = await cartService.removeProduct(cart, productId)
        return res.send(cart)
    }
    catch (e) {
        if (cartService.Errors[e.message])
            return res.status(404).json({error: cartService.Errors[e.message]})
        console.error(`controllers.cart.removeProduct: ${e}`)
        return res.status(500).send({error: 'Error removing product from cart'})
    }
}

async function removeProducts(req, res) {
    try {
        const username = req.username
        const productId = req.body.id
        let cart = await cartService.getCart(username)
            cart = await cartService.removeProducts(cart)
        return res.send(cart)
    }
    catch (e) {
        if (cartService.Errors[e.message])
            return res.status(404).json({error: cartService.Errors[e.message]})
        console.error(`controllers.cart.removeProducts: ${e}`)
        return res.status(500).send({error: 'Error removing products'})
    }
}

export default {
    getCart,
    addProduct,
    updateProduct,
    removeProduct,
    removeProducts,
}