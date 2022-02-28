import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

import productsService from '../services/products.js'

/***
 * Creating a product implies uploading a file
 * so we use multer and HTML form POSTs instead of a REST API
 */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${uuidv4()}-${file.originalname}`)
    }
})

function uploadImg(req, res, next) {multer({ storage }).single('thumbnail')(req, res, next)}

async function createProduct(req, res) {
    const file = req.file // seteado por multer que debe llamarse antes
    if (!file) return res.status(400).json({error: 'Error uploading file'})
    req.body.thumbnail = file.path
    try {
        const prod = await productsService.createProduct(req.body)
        return res.json(prod)
    }
    catch (e) {
        if (e.message === 'PARAM_MISSING')
            return res.status(400).json({error: productsService.Errors[e.message]})
        else {
            console.error(`controller.products.createProduct: ${e}`)
            return res.status(500).send({error: 'Error creating product'})
        }
    }
}

async function getProducts(req, res) {
    try {
        const prods = await productsService.getProducts()
        return res.send(prods)
    }
    catch (e) {
        console.error(`controller.products.getProducts: ${e}`)
        return res.status(500).send({error: 'Error getting products'})
    }
}

async function getProduct(req, res) {
    try {
        const prod = await productsService.getProduct(req.params.id)
        if (typeof prod === 'undefined') {
            return res.status(404).send({error: 'Product not found' })
        }
        else
            return res.send(prod)
    }
    catch (e) {
        console.error(`controller.products.getProduct: ${e}`)
        return res.status(500).send({error: 'Error getting product'})
    }
}

async function updateProduct(req, res) {
    try {
        const prod = req.body
        prod.id = req.params.id
        await productsService.updateProduct(prod)
        return res.json(prod)
    }
    catch (e) {
        console.error(`controller.products.updateProduct: ${e}`)
        return res.status(500).send({error: 'Error updating product'})
    }}

async function deleteProduct(req, res) {
    try {
        const prod = await productsService.deleteProduct(req.params.id)
        return res.send(prod)
    }
    catch (e) {
        console.error(`controller.products.deleteProduct: ${e}`)
        return res.status(500).send({error: 'Error deleting product'})
    }
}

export default {
    uploadImg,
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
