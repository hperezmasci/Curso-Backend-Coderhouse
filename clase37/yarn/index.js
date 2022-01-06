import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hola Yarn!")
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));