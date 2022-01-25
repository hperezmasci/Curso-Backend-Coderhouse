import ProductsDao from '../daos/ProductsMongoDB.js'
import logger from '../logger.js'

const Products = ProductsDao.getInstance()

async function getProducts(req, res) {
    try {
        const prods = await Products.getAll()
        res.send(prods)
    }
    catch (err) {logger.error(`api.products.getProducts: ${err}`)}
}

async function getProduct(req, res) {
    try {
        const prod = await Products.getById(req.params.id)
        if (typeof prod === 'undefined') {
            logger.warn('producto no encontrado')
            res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        }
        else
            res.send(prod)
    }
    catch (err) {logger.error(`api.products.getProduct: ${err}`)}
}

async function createProduct(req, res) {
    try {
        const prod = req.body
        prod.timestamp = Date.now()
        res.json(await Products.save(prod))
    }
    catch (err) {logger.error(`api.products.createProduct: ${err}`)}
}

async function updateProduct(req, res) {
    try {
        const prod = req.body
        prod.id = req.params.id
        prod.timestamp = Date.now()
        await Products.update(prod)
        res.json(prod)
    }
    catch (err) {logger.error(`api.products.updateProduct: ${err}`)}
}

async function deleteProduct(req, res) {
    try {
        const prod = await Products.deleteById(req.params.id)
        res.send(prod)
    }
    catch (err) {logger.error(`api.products.deleteProduct: ${err}`)}
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
