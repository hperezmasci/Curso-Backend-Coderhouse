const express = require('express')
const session = require('express-session')

const app = express()
app.use(express.json())

app.use(session({
    secret: 'qwerty',
    resave: false,
    saveUninitialized: false,
    rolling: true, // para refrescar el ttl cada vez que se interactúa con la sesión
    cookie: {
    maxAge: 20000   // msec. Esto puede obviarse y la cookie toma la duración de la sesión (10 sec en este caso)
                    // si este está seteado, hace un override del ttl de la sesión
    }
}))

// DB usuarios
const users = [
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

// este endpoint requiere estar autenticado (usa middleware auth)
app.get('/profile', auth, (req, res) => {
    return res.send('Si estás viendo esto es porque ya te logueaste')
})


app.get('/signup', (req, res) => {
    const { username, password } = req.query

    const user = users.find(user => {
        return user.username === username
    })

    if (user) {
        return res.json({ error: `User ${username} already exists`})
    }

    users.push({ username, password })
    return res.json({messsage: `User ${username} registered`})
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
      user: req.session.user
    })
})

const PORT = 8080;

app
.listen(PORT, ()=> console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)) 
.on('error', error=>console.log(`Error en servidor: ${error}`))