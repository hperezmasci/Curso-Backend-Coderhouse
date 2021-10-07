const { options } = require('./options/mariaDB.js')
const knex = require('knex')(options)

const cars = [
    { name: 'Audi', price: 50000},
    { name: 'Mercedes', price: 40000}
]

knex('cars').insert(cars)
.then(() => console.log("data inserted"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy()
})