import DBContainer from './DBContainer.js';
import DBConfig from '../options/sqlite.js'

const object1 = {
    mail: 'pepe@gmail.com',
    ts: new Date(Date.now()).toLocaleString().split(',')[0],
    text: 'mensaje de pepe'
};
const object2 = {
    mail: 'juan@gmail.com',
    ts: new Date(Date.now()).toLocaleString().split(',')[0],
    text: 'mensaje de juan'
};
const object3 = {
    mail: 'pepe@gmail.com',
    ts: new Date(Date.now()).toLocaleString().split(',')[0],
    text: '2do mensaje mensaje de pepe'};

//const prodCont = new Contenedor("./data/productos.txt");
const msgCont = new DBContainer(DBConfig, 'messages')

async function main() {
    let msg2 = {};
    let messages = [];
    try {
        await msgCont.save(object1)
        await msgCont.save(object2)
        await msgCont.save(object3)
        msg2 = await msgCont.getById(2)
        await msgCont.deleteById(2)
        messages = await msgCont.getAll()
        await msgCont.deleteAll()
    }
    catch (err) {
        throw new Error(`main: ${err}`)
    }
    finally {
        msgCont.close()
    }
    console.log(`message #2: ${JSON.stringify(msg2, null, 2)}`)
    console.log(`messages without #2: ${JSON.stringify(messages, null, 2)}`)
};

main();