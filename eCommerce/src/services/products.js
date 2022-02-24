import ProductsDao from '../daos/ProductsMongoDB.js'

const Errors = {
    PARAM_MISSING: 'One or more parameters are missing'
}

const Products = ProductsDao.getInstance()

async function getProducts() {
    const products = await Products.getAll()
    return products
}

async function getProduct(id) {
    const prod = await Products.getById(id)
    return prod
}

async function createProduct(prod) {
    const {title, price, thumbnail} = prod
    if (title === undefined || price === undefined || thumbnail === undefined)
        throw new Error('PARAM_MISSING')
    prod.timestamp = Date.now()
    return await Products.save(prod)
}

async function updateProduct(prod) {
    prod.timestamp = Date.now()
    return await Products.update(prod)
}

async function deleteProduct(id) {
    return await Products.deleteById(id)
}

export default {
    Errors,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}