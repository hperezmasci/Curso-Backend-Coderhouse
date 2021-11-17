import admin from 'firebase-admin'
import conf from '../config.js'

admin.initializeApp({credential: admin.credential.cert(conf.firebase)});

class FirebaseContainer {
    constructor(collection) {
        this.query = admin.firestore().collection(collection)
    }

    async save(object) {
        try {
            // lo que devuelve el add no es el objeto agregado
           const objRef = await this.query.add(object)
           object.id = objRef.id
           return object
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }
    
    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
    
            const response = []
            docs.forEach(function(doc) {
                const obj = doc.data()
                obj.id = doc.id
                response.push(obj)
            })
            return response
        }
        catch (err) {
            throw new Error(`getAll method: ${err}`);  
        }
    }

    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const item = await doc.get()
            const obj = item.data()
            obj.id = item.id
            return obj
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            await this.query.doc(`${id}`).delete()
        }
        catch (err) {
            throw new Error(`deleteById method: ${err}`);  
        }
    }

    async deleteAll() {
        try {
            const objects = await this.getAll();
            for (let i=0; i<objects.length; i++)
                await this.deleteById(objects[i].id)

        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async update(obj) {
        try {
            const doc = this.query.doc(`${obj.id}`)
            const item = await doc.update(obj)
        }
        catch (err) {
            throw new Error(`update method: ${err}`);  
        }
    }

    // Fixme: hay un close?
    async close() {
    }
}

export default FirebaseContainer