import MongoDBContainer from '../containers/MongoDB.js'

const schema = {
    username: { type: String, required: true},
    timestamp: { type: Number, required: true },
    products: { type: Array, required: true }
}

let instance = null

class CartsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('carts', schema)
    }

    static getInstance() {
        if (!instance) instance = new CartsDaoMongoDB()
        return instance
    }

    async getByUsername(username) {
        try {
            return await this.getByField('username', username)            
        }
        catch (err) {
            throw new Error(`CartsDaoMongoDB.getByUserName: ${err}`)
        }
    }
}

export default CartsDaoMongoDB