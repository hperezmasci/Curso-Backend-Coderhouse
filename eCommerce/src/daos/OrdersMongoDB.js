import MongoDBContainer from '../containers/MongoDB.js'

const schema = {
    username: { type: String, required: true},
    timestamp: { type: Number, required: true },
    products: { type: Array, required: true },
    status: { type: String, required: true},
    email: { type: String, required: true}
}

let instance = null

class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('orders', schema)
    }

    static getInstance() {
        if (!instance) instance = new OrdersDaoMongoDB()
        return instance
    }

    async getAllByUsername(username) {
        try {
            return await this.getAllByField('username', username)            
        }
        catch (err) {
            throw new Error(`OrdersDaoMongoDB.getByUserName: ${err}`)
        }
    }
}

export default OrdersDaoMongoDB