import { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import { passport, isAuthenticated } from './authMiddleware.js'
import conf from './config.js'

// XXX FIXME: se usa??
//import flash from 'connect-flash'

const authRouter = new Router()

// sessions
authRouter.use(session({
    store: MongoStore.create({
        mongoUrl: conf.atlas.cnxStr,
        mongoOptions: conf.atlas.options
    }),
    secret: 'shhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true, // para refrescar el ttl cada vez que se interactúa con la sesión
    cookie: {
        maxAge: 10000   // msec. Esto puede obviarse y la cookie toma la duración de la sesión
                        // si este está seteado, hace un override del ttl de la sesión
    }
}))

authRouter.use(passport.initialize())
authRouter.use(passport.session())
// XXX FIXE: se usa?
//authRouter.use(flash())

authRouter.post(
    '/register',
    passport.authenticate(
        'register',
        {
            successRedirect: '/',
            failureRedirect: '/register.html',
            failureFlash: true
        }
    )
)

authRouter.get('/', isAuthenticated, (req, res) => {
    res.render('index.handlebars', {username: req.session.username})
})

authRouter.post('/login', (req, res) => {
    // XXX TODO: fix login (este es el que no autentica)
    req.session.username = req.body.username
    res.redirect('/')
})

authRouter.post('/logout', isAuthenticated, (req, res) => {
    const username = req.session.username
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.render('logout.handlebars', {username})
    })
})

export default authRouter