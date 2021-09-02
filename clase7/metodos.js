import express from 'express';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

const frase = "Hola mundo cómo están";

app.get('/api/frase', (req,res)=>{
    res.json({frase});
});

app.get('/api/letras/:num', (req, res) => {
    const char = frase.substr(req.params.num,1);
    res.json({letra: char});
});

app.get('/api/palabras/:num', (req, res) => {
    const word = frase.split(" ")[req.params.num];
    res.json({letra: word});
});

// para intercambiar json (application/json)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/mensajes', (req, res) => {
    let body = req.body;
    res.json(body);
});

app.get('/api/suma/:op1/:op2', (req, res) => {
    console.log(req.params);
    let suma = Object.values(req.params).reduce((acc, op) => acc + parseInt(op));
    res.json({suma});
});