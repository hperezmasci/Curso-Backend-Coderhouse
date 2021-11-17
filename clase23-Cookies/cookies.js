const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// el parámetro es el secret
app.use(cookieParser('query'))

// crea cookie llamada "server" con el valor "express"
app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie set')
})

// crea cookie llamada "server2" con el valor "express2"
app.get('/setEx', (req, res) => {
    res.cookie('server2', 'express2', {maxAge: 30000}).send('Cookie SetEx')
})

app.get('/set-signed', (req, res) => {
    res.cookie('serverSigned', 'expressSigned', {signed: true}).send('Cookie set')
})

// muestra las cookies (el browser las manda en el request)
app.get('/get', (req, res) => {
    res.send({
        server: req.cookies.server,
        server2: req.cookies.server2,
        serverSigned: req.signedCookies.serverSigned
    })
})

// borra la cookie server (pero no la server2)
app.get('/clear', (req, res) => {
    res.clearCookie('server').send('Cookie clear')
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
}); 
server.on('error', error=>console.log('Error en servidor', error));