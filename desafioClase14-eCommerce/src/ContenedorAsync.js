import { promises, F_OK } from 'fs';

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            // test if file exists
            await promises.access(this.path, F_OK);
            // if exists and accesible, read file
            const content = await promises.readFile(this.path);
            return JSON.parse(content);
        }
        catch (err) {
            if (err.code !== 'ENOENT')
                throw new Error(`getAll method: ${err}`);  
            // file does not exist, return like it contained an empty array
            return [];
        }
    }

    async save(product) {
        try {
            const products = await this.getAll();
            const len = products.length;
            // new id = max id + 1
            if (product.id === undefined) {product.id = (len === 0 ? 0 : Math.max.apply(Math, products.map(o => { return o.id; }))) + 1};
            products.push(product);
            await promises.writeFile(this.path,JSON.stringify(products, null, 2));
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            return products[products.findIndex(prod => prod.id == id)];
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async deleteAll() {
        try {
            await promises.writeFile(this.path, "[]");
        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            let products = await this.getAll();
            await this.deleteAll();
            for (let i=0; i<products.length; i++) {
                if (products[i].id != id) {
                    await this.save(products[i]);
                }
            }
        }
        catch (err) {
            throw new Error(`deleteById method: ${err}`);  
        }
    }
}

export default Contenedor;