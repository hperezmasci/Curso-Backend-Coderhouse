import options from '../options/sqlite.js'
import knexLib from 'knex'
const knex = knexLib(options)

knex.schema.createTable('messages', table => {
    table.increments('id').notNullable()
    table.string('mail').notNullable()
    table.string('ts').notNullable()
    table.string('text').notNullable()
})
.then(() => console.log("table created"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})