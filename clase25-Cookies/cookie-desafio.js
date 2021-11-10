const express = require('express')
const cookieParser = require('cookie-parser')
const { clear } = require('console')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.post('/cookies', (req, res) => {
    const {name, value, maxAge} = req.body

    res.cookie(name, value, {maxAge}).send('Cookie set')
})

app.get('/cookies', (req, res) => {
    res.json(req.cookies)
})

app.delete('/cookies/:name', (req, res) => {
    const {name} = req.params
    res.clearCookie(name).send('Cookie clear')
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
}); 
server.on('error', error=>console.log('Error en servidor', error));