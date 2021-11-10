import admin from 'firebase-admin'
import conf from './config.js'

admin.initializeApp({
  credential: admin.credential.cert(conf.firebase)
});

CRUD()

async function CRUD() {
    const db = admin.firestore()
    const query = db.collection('usuarios')

    // create
    try {
        let id = 1
        let doc = query.doc(`${id}`)
        await doc.create({nombre: 'Jose', dni: 12345666})
        id++
        doc = query.doc(`${id}`)
        await doc.create({nombre: 'Anna', dni: 654321})

        await query.add({nombre: 'Pepe', dni: 12345666})
        await query.add({nombre: 'Juan', dni: 654321})
    }
    catch (error) {console.log(error)}

    // read all
    try {
        const querySnapshot = await query.get()
        const docs = querySnapshot.docs

        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni
        }))
        console.log(response)
    }
    catch (error) {console.log(error)}

    // read id
    try {
        const id = 2
        const doc = query.doc(`${id}`)
        const item = await doc.get()
        const response = item.data()
        console.log(response)
    }
    catch (error) {console.log(error)}

    
    // update
    try {
        const id = 2
        const doc = query.doc(`${id}`)
        const item = await doc.update({dni: 9876})
        console.log("El usuario ha sido actualizado", item)
    }
    catch (error) {console.log(error)}

    // delete
    try {
        const id = 1
        const doc = query.doc(`${id}`)
        const item = await doc.delete()
        console.log("El usuario ha sido borrado", item)
    }
    catch (error) {console.log(error)}
}