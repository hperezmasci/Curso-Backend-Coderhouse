import ProductsDaoFirebase from './ProductsDaoFirebase.js';

const object1 = {
    timestamp: Date.now(),
    title: 'PS5',
    price: 159000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg',
    stock: 10
};
const object2 = {
    timestamp: Date.now(),
    title: 'PS4',
    price: 100000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg',
    stock: 5
};
const object3 = {
    timestamp: Date.now(),
    title: 'Laptop Dell G3',
    price: 160000,
    thumbnail: 'https://www.muycomputer.com/wp-content/uploads/2020/10/Sony-PS5-pre-venta-aumento-demanda-e1603881786569.jpg',
    stock: 3
};

const prodCont = new ProductsDaoFirebase()

async function main() {
    let prod2 = {};
    let prod3 = {};
    let products = [];
    try {
        await prodCont.save(object1)
        prod2 = await prodCont.save(object2)
        prod3 = await prodCont.save(object3)
        prod2 = await prodCont.getById(prod2.id)
        await prodCont.deleteById(prod2.id)
        prod3.price = 100000
        await prodCont.update(prod3)
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
    console.log(`products #3: ${JSON.stringify(prod3, null, 2)}`)
    console.log(`products without #2: ${JSON.stringify(products, null, 2)}`)
}

main()
