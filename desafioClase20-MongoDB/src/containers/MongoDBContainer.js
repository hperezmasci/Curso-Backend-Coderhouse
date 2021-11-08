import mongoose from 'mongoose'
import conf from '../config.js'

await mongoose.connect(conf.mongodb.cnxStr, conf.mongodb.options)

class MongoDBContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
    }

    async save(object) {
        try {
           return await this.collection.create(object)
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }

    async getAll() {
        try {
            const objects = await this.collection.find()
            return objects
        }
        catch (err) {
            throw new Error(`getAll method: ${err}`);  
        }
    }

    async getById(id) {
        try {
            return await this.collection.findOne({_id: id})
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany()
        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({_id: id})
        }
        catch (err) {
            throw new Error(`deleteById method: ${err}`);  
        }
    }

    async update(obj) {
        try {
            await this.collection.updateOne({_id: obj._id}, obj)
        }
        catch (err) {
            throw new Error(`update method: ${err}`);  
        }
    }

    async close() {
        try {
            await mongoose.connection.close()
        }
        catch (err) {
            throw new Error(`close method: ${err}`)
        }
    }
}

export default MongoDBContainer