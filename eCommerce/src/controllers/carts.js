import cartsService from '../services/carts.js'

async function getCart(req, res) {
    try {
        const username = req.username
        const cart = await cartsService.getCart(username)
        return res.send(cart)
    }
    catch (e) {
        console.error(`controllers.carts.getCart: ${e}`)
        return res.status(500).send({error: 'Error getting cart'})
    }
}

async function addProduct(req, res) {
    try {
        const username = req.username
        const productId = req.body.id
        const qty = req.body.qty
        let cart = await cartsService.getCart(username)
            cart = await cartsService.addProduct(cart, productId, qty)
        return res.send(cart)
    }
    catch (e) {
        const code = e.message === 'BAD_PARAM' ? 400 : 404
        if (cartService.Errors[e.message])
            return res.status(code).json({error: cartsService.Errors[e.message]})
        console.error(`controllers.carts.addProduct: ${e}`)
        return res.status(500).send({error: 'Error adding product to cart'})
    }
}

async function updateProduct(req, res) {
    try {
        const username = req.username
        const productId = req.params.id
        const qty = req.body.qty
        let cart = await cartsService.getCart(username)
            cart = await cartsService.updateProductQty(cart, productId, qty)
        return res.send(cart)
    }
    catch (e) {
        const code = e.message === 'BAD_PARAM' ? 400 : 404
        if (cartService.Errors[e.message])
            return res.status(code).json({error: cartsService.Errors[e.message]})
        console.error(`controllers.carts.updateProduct: ${e}`)
        return res.status(500).send({error: 'Error updating product in cart'})
    }
}

async function removeProduct(req, res) {
    try {
        const username = req.username
        const productId = req.params.id
        let cart = await cartsService.getCart(username)
            cart = await cartsService.removeProduct(cart, productId)
        return res.send(cart)
    }
    catch (e) {
        if (cartsService.Errors[e.message])
            return res.status(404).json({error: cartsService.Errors[e.message]})
        console.error(`controllers.carts.removeProduct: ${e}`)
        return res.status(500).send({error: 'Error removing product from cart'})
    }
}

async function removeProducts(req, res) {
    try {
        const username = req.username
        const productId = req.body.id
        let cart = await cartsService.getCart(username)
            cart = await cartsService.removeProducts(cart)
        return res.send(cart)
    }
    catch (e) {
        if (cartsService.Errors[e.message])
            return res.status(404).json({error: cartsService.Errors[e.message]})
        console.error(`controllers.carts.removeProducts: ${e}`)
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