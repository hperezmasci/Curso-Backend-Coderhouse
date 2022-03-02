import FS from 'fs'
const fs = FS.promises

import ProductsDao from '../daos/ProductsMongoDB.js'

const Errors = {
    PARAM_MISSING: 'One or more parameters are missing',
    WRONG_FILENAME: 'Uploaded file name is wrong',
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
    const {title, price, thumbnail, category} = prod
    if (title === undefined || price === undefined || thumbnail === undefined || category === undefined)
        throw new Error('PARAM_MISSING')
    prod.timestamp = Date.now()
    const newProd = await Products.save(prod)
    await moveImage(newProd)
    await Products.update(newProd)
    return newProd
}

async function updateProduct(prod) {
    prod.timestamp = Date.now()
    return await Products.update(prod)
}

async function deleteProduct(id) {
    const prod = await getProduct(id)
    await removeImage(prod)
    await Products.deleteById(prod.id)
    return prod
}

// Auxiliar function: move image file to it's final name and path
async function moveImage(prod) {
    const [ base, mid, filename ] = prod.thumbnail.split('/')
    if (base !== 'public' || mid !== 'uploads' || !filename) throw Error('WRONG_FILENAME')
    const [ basename, ext ] = filename.split('.')
    if (!ext) throw Error('WRONG_FILENAME')

    const newName = `${prod.id}.${ext}`
    const newPath = `public/imagenes/${newName}`
    const newPublicPath = `imagenes/${newName}`

    await fs.rename(prod.thumbnail, newPath)
    prod.thumbnail = newPublicPath
}

async function removeImage(prod) {
    try {
        await fs.unlink(`public/${prod.thumbnail}`)
    }
    catch (e) {console.error(`services.products.removeImage: error removing image: ${e}`)}
}

export default {
    Errors,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}