const fs = require('fs');

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            // test if file exists
            await fs.promises.access(this.path, fs.F_OK);
            // if exists and accesible, read file
            const content = await fs.promises.readFile(this.path);
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
            if (product.id === undefined) {product.id = (len === 0 ? 0 : products[len-1].id) + 1};
            products.push(product);
            await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2));
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
            await fs.promises.writeFile(this.path, "[]");
        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            let products = await this.getAll();
            await this.deleteAll();
            //products.forEach(async (product) => {if (product.id !== id) {await this.save(product)}});
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

module.exports = Contenedor;