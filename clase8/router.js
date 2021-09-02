import express from 'express';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

const { Router } = express;

const routerMascotas = new Router();
const routerPersonas = new Router();

// puedo hacer esto a nivel app o sólo por ruta, en este caso sería lo mismo!!
routerMascotas.use(express.json());
routerMascotas.use(express.urlencoded({extended: true}));
routerPersonas.use(express.json());
routerPersonas.use(express.urlencoded({extended: true}));

// in-memory DB
const Personas = [];
const Mascotas = [];

routerMascotas.post('/', (req, res) => {
    Mascotas.push(req.body);
    res.json(req.body);
})

routerMascotas.get('/', (req, res) => {
    res.json(Mascotas);
})

routerPersonas.post('/', (req, res) => {
    Personas.push(req.body);
    res.json(req.body);
})

routerPersonas.get('/', (req, res) => {
    res.json(Personas);
})

app.use('/api/mascotas', routerMascotas);
app.use('/api/personas', routerPersonas);


app.use(express.static('public'));
