import MongoDBContainer from '../containers/MongoDB.js'

const schema = {
    mail: { type: String, required: true },
    ts: { type: String, required: true },
    text: { type: String, required: false}
}

let instance = null

class MessagesDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('messages', schema)
    }

    static getInstance() {
        if (!instance) instance = new MessagesDaoMongoDB()
        return instance
    }
}

export default MessagesDaoMongoDB