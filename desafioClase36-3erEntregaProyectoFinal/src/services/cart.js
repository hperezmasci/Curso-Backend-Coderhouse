import CartsDao from '../daos/CartsMongoDB.js'
import ProductsDao from '../daos/ProductsMongoDB.js'

// XXX FIXME: probablemente sea mejor que llame a services product en lugar del DAO aquí
const Carts = CartsDao.getInstance()
const Products = ProductsDao.getInstance()

// XXX TODO: manejar stock???
async function addProduct(username, productId) {
    try {
        const cart = await getCart(username)

        const prod = await Products.getById(productId)
        if (prod === null || prod === undefined)
            return new Error('product not found')

        await Products.update(prod)
        
        cart.products.push(prod)
        await Carts.update(cart)

        return cart
    }
    catch (err) {throw new Error(`addProduct: ${err}`)}
}

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
    catch (err) {throw new Error(`getCart: ${err}`)}
}

export default {
    getCart,
    addProduct
}