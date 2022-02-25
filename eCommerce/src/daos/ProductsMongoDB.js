import MongoDBContainer from '../containers/MongoDB.js'

const schema = {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true},
    thumbnail: { type: String, required: true}
}

let instance = null

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('products', schema)
    }

    static getInstance() {
        if (!instance) instance = new ProductsDaoMongoDB()
        return instance
    }
}

export default ProductsDaoMongoDB