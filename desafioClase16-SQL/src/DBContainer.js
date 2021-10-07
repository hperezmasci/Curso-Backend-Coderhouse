import knexLib from 'knex'

class DBContainer {
    constructor(knexConf, table) {
        this.table = table
        this.knex = knexLib(knexConf)
    }

    async save(object) {
        try {
           await this.knex(this.table).insert(object)
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }

    async getAll() {
        try {
            const objects = await this.knex(this.table).select('*')
            return objects
        }
        catch (err) {
            throw new Error(`getAll method: ${err}`);  
        }
    }

    async close() {
        try {
            await this.knex.destroy()
        }
        catch (err) {
            throw new Error(`close method: ${err}`)
        }
    }

    async getById(id) {
        try {
            const object = await this.knex(this.table).select('*').where({id:id})
            return object;
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async deleteAll() {
        try {
            await this.knex(this.table).delete()
        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            await this.knex(this.table).del().where({id:id})
        }
        catch (err) {
            throw new Error(`deleteById method: ${err}`);  
        }
    }
}




/*
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
*/

export default DBContainer