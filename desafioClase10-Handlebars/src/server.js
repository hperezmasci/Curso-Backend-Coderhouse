import express from 'express';
import exphbs from 'express-handlebars';
import Contenedor from './ContenedorAsync.js';

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')

/*
app.get('/', (req, res) => {
  res.render('datos', {
    title: 'Ingreso de Datos Personales',
    nombre: 'coder',
    apellido: 'house',
    edad: 25,
    email: 'coder@house',
    telefono: '12345678'
  })
})
*/

const cont = new Contenedor("./data/productos.txt");

app.get('/productos', async (req, res) => {
    try {
        const products = await cont.getAll()
        const listExists = products.length
        res.render('products', {products, listExists})
    }
    catch (err) {throw new Error(`/products: ${err}`)}
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
