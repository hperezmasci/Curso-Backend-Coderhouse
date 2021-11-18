import { promises, F_OK } from 'fs';
import conf from '../config.js'

class AsyncFSContainer {
    constructor(fileName) {
        this.file = `${conf.filesystem.path}/${fileName}`;
    }

    async getAll() {
        try {
            // test if file exists
            await promises.access(this.file, F_OK);
            // if exists and accesible, read file
            const content = await promises.readFile(this.file);
            return JSON.parse(content);
        }
        catch (err) {
            if (err.code !== 'ENOENT')
                throw new Error(`getAll method: ${err}`);  
            // file does not exist, return like it contained an empty array
            return [];
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll();
            const len = objs.length;
            // new id = max id + 1
            if (obj.id === undefined) {obj.id = (len === 0 ? 0 : Math.max.apply(Math, objs.map(o => { return o.id; }))) + 1};
            objs.push(obj);
            await promises.writeFile(this.file,JSON.stringify(objs, null, 2));
            return obj
        }
        catch (err) {
            throw new Error(`save method: ${err}`);  
        }
    }

    async getById(id) {
        try {
            const objs = await this.getAll();
            return objs[objs.findIndex(obj => obj.id == id)];
        }
        catch (err) {
            throw new Error(`getById method: ${err}`);  
        }
    }

    async deleteAll() {
        try {
            await promises.writeFile(this.file, "[]");
        }
        catch (err) {
            throw new Error(`deleteAll method: ${err}`);  
        }
    }

    async deleteById(id) {
        try {
            let objs = await this.getAll();
            await this.deleteAll();
            for (let i=0; i<objs.length; i++) {
                if (objs[i].id != id) {
                    await this.save(objs[i]);
                }
            }
        }
        catch (err) {
            throw new Error(`deleteById method: ${err}`);  
        }
    }

    async update(obj) {
        try {
            const id = obj.id
            delete obj.id
            await this.deleteById(id)
            return await this.save(obj)
        }
        catch (err) {
            throw new Error(`update method: ${err}`);  
        }
    }

    async close() {
    }
}

export default AsyncFSContainer;