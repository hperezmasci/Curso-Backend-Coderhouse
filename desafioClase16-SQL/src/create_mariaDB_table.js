import options from '../options/mariaDB.js'
import knexLib from 'knex'
const knex = knexLib(options)

knex.schema.createTable('products', table => {
    table.increments('id').notNullable()
    table.string('title').notNullable()
    table.float('price').notNullable()
    table.string('thumbnail').notNullable()
})
.then(() => console.log("table created"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})