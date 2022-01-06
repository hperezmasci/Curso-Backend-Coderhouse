import MongoDBContainer from '../containers/MongoDBContainer.js'

const schema = {
    username:   { type: String, required: true },
    password:   { type: String, required: true },
    name:       { type: String, required: false },
    address:    { type: String, required: false },
    age:        { type: Number, required: false },
    phone:      { type: String, required: false }
}

class UsersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('users', schema)
    }

    async getByUsername(username) {
        try {
            return await this.getByField('username', username)            
        }
        catch (err) {
            throw new Error(`getByUserName method: ${err}`)
        }
    }
}

export default UsersDaoMongoDB