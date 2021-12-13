import MongoDBContainer from '../containers/MongoDBContainer.js'

const schema = {
    mail: { type: String, required: true },
    ts: { type: String, required: true },
    text: { type: String, required: false}
}

class MessagesDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('messages', schema)
    }
}

export default MessagesDaoMongoDB