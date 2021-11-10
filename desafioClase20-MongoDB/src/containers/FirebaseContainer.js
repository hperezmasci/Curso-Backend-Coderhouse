import admin from 'firebase-admin'
import conf from '../config.js'

admin.initializeApp({credential: admin.credential.cert(conf.firebase)});

class FirebaseContainer {
    constructor(collection) {
        this.query = admin.firestore().collection(collection)
    }

    async save(object) {
        try {
            // FIXME: cómo obtengo el ID del objeto que agrego?
            // lo que devuelve el add no es el objeto agregado
           await this.query.add(object)
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

    // Fixme: hay un close?
    async close() {
    }
}

export default FirebaseContainer