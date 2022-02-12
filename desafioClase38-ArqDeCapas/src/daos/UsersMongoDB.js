import MongoDBContainer from '../containers/MongoDB.js'

const schema = {
    username:   { type: String, required: true },
    password:   { type: String, required: true },
    name:       { type: String, required: false },
    address:    { type: String, required: false },
    age:        { type: Number, required: false },
    phone:      { type: String, required: false }
}

let instance = null

class UsersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('users', schema)
    }

    async getByUsername(username) {
        try {
            return await this.getByField('username', username)            
        }
        catch (err) {
            throw new Error(`UsersDaoMongoDB.getByUserName: ${err}`)
        }
    }

    static getInstance() {
        if (!instance) instance = new UsersDaoMongoDB()
        return instance
    }
}

export default UsersDaoMongoDB