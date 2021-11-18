if (process.env.DBType === undefined) {
    process.env.DBType = 'mongodb'
}

const ProductsDaoModules = {
    mongodb: './ProductsDaoMongoDB.js',
    firebase: './ProductsDaoFirebase.js',
    filesystem: './ProductsDaoFilesystem.js'
}

const CartsDaoModules = {
    mongodb: './CartsDaoMongoDB.js',
    firebase: './CartsDaoFirebase.js',
    filesystem: './CartsDaoFilesystem.js'
}

const ProductsDaoModule = ProductsDaoModules[process.env.DBType];
const CartsDaoModule = CartsDaoModules[process.env.DBType];

if (!ProductsDaoModule || !CartsDaoModule)
    throw Error('Invalid DBType environment variable');

const PDAO = await import(ProductsDaoModule)
const CDAO = await import(CartsDaoModule)
const ProductsDao = new PDAO.default()
const CartsDao = new CDAO.default()

export {ProductsDao, CartsDao}