import DBContainer from './DBContainer.js';
import DBConfig from '../options/mariaDB.js'

const object1 = {
    title: 'PS5',
    price: 159000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg'
};
const object2 = {
    title: 'PS4',
    price: 100000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg'
};
const object3 = {
    title: 'Laptop Dell G3',
    price: 160000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg'
};

//const prodCont = new Contenedor("./data/productos.txt");
const prodCont = new DBContainer(DBConfig, 'products')

async function main() {
    let prod2 = {};
    let products = [];
    try {
        await prodCont.save(object1)
        await prodCont.save(object2)
        await prodCont.save(object3)
        prod2 = await prodCont.getById(2)
        await prodCont.deleteById(2)
        products = await prodCont.getAll()
        await prodCont.deleteAll()
    }
    catch (err) {
        throw new Error(`main: ${err}`)
    }
    finally {
        prodCont.close()
    }
    console.log(`products #2: ${JSON.stringify(prod2, null, 2)}`)
    console.log(`products without #2: ${JSON.stringify(products, null, 2)}`)
};

main();