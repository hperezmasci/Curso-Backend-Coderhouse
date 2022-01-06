import mongoose from 'mongoose'
import conf from '../config.js'

await mongoose.connect(conf.atlas.cnxStr, conf.atlas.options)

function normalizeObj(object) {
    if (object === null) return null
    const obj = JSON.parse(JSON.stringify(object, null, 2))
    obj["id"] = obj["_id"]
    delete obj["_id"]
    return obj
}

class MongoDBContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
    }

    async save(object) {
        try {
           const obj = await this.collection.create(object)
           return normalizeObj(obj)
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }

    async getAll() {
        try {
            const objects = await this.collection.find()
            return objects.map(normalizeObj)
        }
        catch (err) {
            throw new Error(`getAll method: ${err}`);  
        }
    }

    async getById(id) {
        try {
            const obj = await this.collection.findOne({_id: id})
            return normalizeObj(obj)
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async getByField(fieldName, value) {
        try {
            const obj = await this.collection.findOne({fieldName: value})
            return normalizeObj(obj)
        }
        catch (err) {
            throw new Error(`getByField method: ${err}`);  
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
            await this.collection.updateOne({_id: obj.id}, obj)
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