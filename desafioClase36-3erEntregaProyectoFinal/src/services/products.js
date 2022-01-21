import ProductsDao from '../daos/ProductsMongoDB.js'

const Products = ProductsDao.getInstance()

async function getProducts() {
    try {
        const products = await Products.getAll()
        return products
    }
    catch (err) {throw new Error(`getProducts: ${err}`)}
}

export default {
    getProducts
}