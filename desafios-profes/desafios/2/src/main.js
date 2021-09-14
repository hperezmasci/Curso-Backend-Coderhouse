const express = require('express')
const { promises: fs } = require('fs')

const app = express()

app.engine('cte', async (filePath, options, callback) => {
  try {
    const content = await fs.readFile(filePath)
    const rendered = content.toString()
      .replace('^^titulo$$', '' + options.titulo + '')
      .replace('^^mensaje$$', '' + options.mensaje + '')
      .replace('^^autor$$', '' + options.autor + '')
      .replace('^^version$$', '' + options.version + '')
    return callback(null, rendered)
  } catch (err) {
    return callback(new Error(err))
  }
})

app.set('views', './views')

app.set('view engine', 'cte')


app.get('/', (req, res) => {
  const datos = {
    titulo: 'algún título en string',
    mensaje: 'algún mensaje en string',
    autor: 'algun autor en string',
    version: 'algun numero'
  }

  res.render('plantilla1', datos)
})

app.listen(8080)