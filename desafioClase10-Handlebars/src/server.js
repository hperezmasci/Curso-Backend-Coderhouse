import express from 'express';
import exphbs from 'express-handlebars';
import Contenedor from './ContenedorAsync.js';

const app = express()

app.use(express.static('public'));

const { Router } = express;
const router = new Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')

const cont = new Contenedor("./data/productos.txt");

router.get('/', async (req, res) => {
    try {
        const products = await cont.getAll()
        const listExists = products.length
        res.render('getProducts', {products, listExists})
    }
    catch (err) {throw new Error(`GET /productos: ${err}`)}
})

router.post('/', async (req, res) => {
  try {
      const product = req.body;
      await cont.save(product)
      res.redirect('/')
  }
  catch (err) {throw new Error(`POST /productos: ${err}`)}
})

app.use('/productos', router);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
