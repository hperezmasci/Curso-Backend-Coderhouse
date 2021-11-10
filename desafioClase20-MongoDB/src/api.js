import { ProductsDao, CartsDao } from './daos/daoSelector.js'


/*
 *
 * Prods API
 * 
 */

async function getProducts(req, res) {
    try {
        const prods = await ProductsDao.getAll()
        res.send(prods)
    }
    catch (err) {throw new Error(`getProducts: ${err}`)}
}

async function getProduct(req, res) {
    try {
        const prod = await ProductsDao.getById(req.params.id)
        if (typeof prod === 'undefined')
            res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        else
            res.send(prod)
    }
    catch (err) {throw new Error(`getProduct: ${err}`)}
}

// XXX TODO: conviene devolver el producto creado con el ID para poder luego accederlo
// especialmente util con postman
async function createProduct(req, res) {
    try {
        const prod = req.body
        prod.timestamp = Date.now()
        // XXX TODO: convendría chequear estructura del producto
        ProductsDao.save(prod)
        res.json(prod)
    }
    catch (err) {throw new Error(`createProduct: ${err}`)}
}

async function updateProduct(req, res) {
    try {
        await ProductsDao.deleteById(req.params.id)
        const prod = req.body
        prod.timestamp = Date.now()
        // XXX TODO: convendría chequear estructura del producto
        await ProductsDao.save(prod)
        res.json(prod)
    }
    catch (err) {throw new Error(`updateProduct: ${err}`)}
}

async function deleteProduct(req, res) {
    try {
        const prod = await ProductsDao.deleteById(req.params.id)
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

async function createCart(req, res) {
    try {
        const cart = req.body
        // XXX TODO: convendría chequear estructura del carrito
        cart.timestamp = Date.now();
        cart.products = [];
        CartsDao.save(cart)
        res.json(req.body)
    }
    catch (err) {throw new Error(`createCart: ${err}`)}
}

async function addProductToCart(req, res) {
    try {
        const cart = await CartsDao.getById(req.params.id)
        if (cart === null) {
                return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }

        const prod = await ProductsDao.getById(req.body.id)
        if (prod === null) {
            return res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        }

        // nuevo stock
        const stock = prod.stock - 1

        if (stock < 0) {
            return res.status(404).send({error: -5, descripcion: 'no hay stock del producto'})
        }

        // property stock no tiene sentido en un producto dentro de carrito
        // FIXME: no le quita el campo stock
        delete prod.stock
        cart.products.push(prod)

        /*
         * FIXME: Hay que soportar este método en files
         * se venía haciendo con delete y save, pero no sirve para mongodb
         * en files internamente será un delete y un save así:
         * await CartsDao.deleteById(cart.id)
         * await CartsDao.save(cart)
         */
        await CartsDao.update(cart)

        /*
         * FIXME: Hay que soportar este método en files
         * se venía haciendo con delete y save, pero no sirve para mongodb
         * en files internamente será un delete y un save así:
         * prod.stock = stock
         * await ProductsDao.deleteById(prod.id)
         * await ProductsDao.save(prod)
         */
        prod.stock = stock
        await ProductsDao.update(prod)

        res.json(cart)
    }
    catch (err) {throw new Error(`addProductToCart: ${err}`)}
}

async function deleteCart(req, res) {
    try {
        const cart = await CartsDao.deleteById(req.params.id)
        res.send()
    }
    catch (err) {throw new Error(`deleteCart: ${err}`)}
}

async function getProductsFromCart(req, res) {
    try {
        const cart = await CartsDao.getById(req.params.id)
        if (cart === null) {
            return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }
        res.send(cart.products)
    }
    catch (err) {throw new Error(`getProductsFromCart: ${err}`)}
}

async function deleteProductFromCart(req, res) {
    try {
        const cart = await CartsDao.getById(req.params.id)
        if (typeof cart === 'undefined') {
                return res.status(404).send({error: -3, descripcion: 'carrito no encontrado' })
        }

        const prodId = req.params.id_prod
        // FIXME: debe proveerse un médoto que abstraiga esto porque me meto en la implementacion
        // (sólo mongodb pone _id)
        const idx = cart.products.findIndex(p => p._id == prodId)
        if (idx === -1) {
            return res.status(404).send({error: -4, descripcion: 'producto no encontrado' })
        }
        // quito el producto
        cart.products.splice(idx,1)

        // update cart with new product array
        await CartsDao.update(cart)

        // update (increase) stock in prod
        const prod = await ProductsDao.getById(prodId)
        console.log(`prodId: ${prodId}`)
        console.log(`prod: ${JSON.stringify(prod, null, 2)}`)
        prod.stock++;
        console.log(`prod: ${JSON.stringify(prod, null, 2)}`)
        await ProductsDao.update(prod)

        res.json(cart)
    }
    catch (err) {throw new Error(`deleteProductToCart: ${err}`)}
}

export { createCart, deleteCart, getProductsFromCart, addProductToCart, deleteProductFromCart }