import productsService from '../services/products.js'

async function getProducts(req, res) {
    try {
        const username = req.username
        const products = await productsService.getProducts()
        res.render('products', {username, products})
    }
    catch (err) {throw new Error(`getProducts: ${err}`)}
}

export default {
    getProducts
}