const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const newsRouter = require('./routes/news')

require('dotenv').config()

const { fn } = require('./config/database')

const database = fn(process.env)
mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`)

const app = express()
app.use(cors())
app.use(express.json())

app.get('', (req, res) => {
 return res.json({ date: new Date() })
})

app.use('/news', newsRouter)

const PORT = process.argv[2] || 3000

app
 .listen(PORT, () => console.log(`Aplicación corriendo en el puerto ${PORT}`))
 .on('error', err => console.error(err))