const express = require('express')
const session = require('express-session')
//const { send } = require('process')

const app = express()
app.use(express.json())

app.use(session({
  secret: 'qwerty'
}))

// DB usuarios
const users = [
    {
        username: 'iram',
        password: '1234',
        admin: true
    },
    {
        username: 'marcelo',
        password: '1234',
        admin: false
    }
]

// se usará de middleware authentication
const auth = (req, res, next) => {
    if (req.session.user) {
        return next()
    }

    return res.status(401).json({
        error: "Necesitas iniciar sesión"
    })
}

// se usará de middleware check admin
const isAdmin = (req, res, next) => {
    if (req.session.admin) {
        return next()
    }

    return res.status(401).json({
        error: "Necesitas ser usuario administrador"
    })
}

app.get('/session', (req, res) => {
    // contador no vive en request en realidad, vive en session que está en memoria
    if (req.session.contador) {
      req.session.contador++
      return res.send(`Has visitado ${req.session.contador} veces el sitio.`)
    }
    req.session.contador = 1
    res.send('Bienvenido.')
})

app.get('/logout', (req, res) => {
    return req.session.destroy(err => {
        if (!err) {
            return res.send({ logout: true })
        }
        return res.send({ error: err })
    })
})
   
app.get('/login', (req, res) => {
    const { username, password } = req.query
   
    const user = users.find(user => {
      return user.username === username && user.password === password
    })
   
    if (!user) {
      return res.json({ error: 'Login failed' })
    }
   
    req.session.user = username
    req.session.admin = user.admin
    res.send({
      user: req.session.user,
      admin: req.session.admin
    })
})

// este endpoint requiere estar autenticado (usa middleware auth)
app.get('/profile', auth, (req, res) => {
    return res.send('Si estás viendo esto es porque ya te logueaste')
})

// este endpoint requiere estar autenticado y ser admin (usa middlewares auth y isAdmin)
app.get('/admin', auth, isAdmin, (req, res) => {
    return res.send('Si estás viendo esto es porque eres Admin')
})

const PORT = 8080;

app
.listen(PORT, ()=> console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)) 
.on('error', error=>console.log(`Error en servidor: ${error}`))