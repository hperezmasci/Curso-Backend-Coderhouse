import MongoDBContainer from '../containers/MongoDBContainer.js'

const schema = {
    timestamp: { type: Number, required: true },
    products: { type: Array, required: true }
}

class CartsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('carts', schema)
    }
}

export default CartsDaoMongoDB