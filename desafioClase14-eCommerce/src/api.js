import Contenedor from './ContenedorAsync.js'

/*
 *
 * Prods API
 * 
 */

const prodsCont = new Contenedor('data/products.txt')

async function getProducts(req, res) {
    try {
        const prods = await prodsCont.getAll()
        res.send(prods)
    }
    catch (err) {throw new Error(`getProducts: ${err}`)}
}

async function getProduct(req, res) {
    try {
        const prod = await prodsCont.getById(req.params.id)
        if (typeof prod === 'undefined')
            res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        else
            res.send(prod)
    }
    catch (err) {throw new Error(`getProduct: ${err}`)}
}

async function createProduct(req, res) {
    try {
        const prod = req.body
        prod.timestamp = Date.now()
        // XXX TODO: convendría chequear estructura del producto
        prodsCont.save(prod)
        res.json(prod)
    }
    catch (err) {throw new Error(`createProduct: ${err}`)}
}

async function updateProduct(req, res) {
    try {
        await prodsCont.deleteById(req.params.id)
        const prod = req.body
        prod.timestamp = Date.now()
        // XXX TODO: convendría chequear estructura del producto
        await prodsCont.save(prod)
        res.json(prod)
    }
    catch (err) {throw new Error(`updateProduct: ${err}`)}
}

async function deleteProduct(req, res) {
    try {
        const prod = await prodsCont.deleteById(req.params.id)
        res.send(prod)
    }
    catch (err) {throw new Error(`deleteProduct: ${err}`)}
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }

/*
 *
 * Carts API
 * 
 */

const cartsCont = new Contenedor('data/carts.txt')

async function createCart(req, res) {
    try {
        const cart = req.body
        // XXX TODO: convendría chequear estructura del carrito
        cart.timestamp = Date.now();
        cart.products = [];
        cartsCont.save(cart)
        res.json(req.body)
    }
    catch (err) {throw new Error(`createCart: ${err}`)}
}

async function addProductToCart(req, res) {
    try {
        const cart = await cartsCont.getById(req.params.id)
        if (typeof cart === 'undefined') {
                return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }
        const prod = await prodsCont.getById(req.body.id)
        if (typeof prod === 'undefined') {
            return res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        }
        // nuevo stock
        const stock = prod.stock - 1

        if (stock < 0) {
            return res.status(404).send({error: -5, descripcion: 'no hay stock del producto'})
        }

        // property stock no tiene sentido en un producto dentro de carrito
        delete prod.stock
        cart.products.push(prod)

        // update cart with new product array
        await cartsCont.deleteById(cart.id)
        await cartsCont.save(cart)

        // update stock in product
        await prodsCont.deleteById(prod.id)
        prod.stock = stock
        await prodsCont.save(prod)

        res.json(cart)
    }
    catch (err) {throw new Error(`addProductToCart: ${err}`)}
}

async function deleteCart(req, res) {
    try {
        const cart = await cartsCont.deleteById(req.params.id)
        res.send()
    }
    catch (err) {throw new Error(`deleteCart: ${err}`)}
}

async function getProductsFromCart(req, res) {
    try {
        const cart = await cartsCont.getById(req.params.id)
        if (typeof cart === 'undefined') {
            return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }
        res.send(cart.products)
    }
    catch (err) {throw new Error(`getProductsFromCart: ${err}`)}
}

async function deleteProductFromCart(req, res) {
    try {
        const cart = await cartsCont.getById(req.params.id)
        if (typeof cart === 'undefined') {
                return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }

        const prodId = req.params.id_prod
        const idx = cart.products.findIndex(p => p.id == prodId)
        if (idx === -1) {
            return res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        }
        // quito el producto
        cart.products.splice(idx,1)

        // update cart with new product array
        await cartsCont.deleteById(cart.id)
        await cartsCont.save(cart)

        // update (increase) stock in prod
        const prod = await prodsCont.getById(prodId)
        console.log(`prodId: ${prodId}`)
        console.log(`prod: ${JSON.stringify(prod, null, 2)}`)
        prod.stock++;
        console.log(`prod: ${JSON.stringify(prod, null, 2)}`)
        await prodsCont.deleteById(prodId)
        await prodsCont.save(prod)

        res.json(cart)
    }
    catch (err) {throw new Error(`addProductToCart: ${err}`)}
}

export { createCart, deleteCart, getProductsFromCart, addProductToCart, deleteProductFromCart }