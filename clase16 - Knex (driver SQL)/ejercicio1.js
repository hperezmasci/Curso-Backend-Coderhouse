const { options } = require('./options/mariaDB.js')
//const knex = require('knex')(options)
const knexLib = require('knex')
const knex = knexLib(options)

const articulos = [
    { nombre: 'PS5', codigo: '1', price: 150000, stock: 10},
    { nombre: 'PS5 Digital', codigo: '2', price: 130000, stock: 5},
    { nombre: 'PS4', codigo: '3', price: 60000, stock: 7},
    { nombre: 'PS4 Pro', codigo: '4', price: 90000, stock: 7},
    { nombre: 'XBox One', codigo: '5', price: 60000, stock: 4}
]

knex.schema.dropTableIfExists('articulos')
.then(() => knex.schema.createTable('articulos', table => {
    table.increments('id').notNullable()
    table.string('nombre', 15).notNullable()
    table.string('codigo', 10).notNullable()
    table.float('price')
    table.integer('stock')
}))
.then(() => knex('articulos').insert(articulos))
.then(() => knex('articulos').select('*'))
.then((rows) => {
    console.log(JSON.stringify(rows, null, 2))
})
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})

// XXX TODO: dropear la tabla si ya existe (usando next)





