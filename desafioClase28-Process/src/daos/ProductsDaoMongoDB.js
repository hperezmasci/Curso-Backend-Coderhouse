import MongoDBContainer from '../containers/MongoDBContainer.js'

const schema = {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true}
}

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('products', schema)
    }
}

export default ProductsDaoMongoDB