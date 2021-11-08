import MongoDBContainer from '../containers/MongoDBContainer.js'

const schema = {
    timestamp: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true}
}

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('products', schema)
    }
}

export default ProductsDaoMongoDB