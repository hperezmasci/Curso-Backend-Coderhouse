import express from 'express'

const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/datos', (req, res) => {
    // alimenta de datos al template con el query string
    res.render('nivel', req.query)
})

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port)
})
server.on('error', error=>console.log('Error en servidor', error))