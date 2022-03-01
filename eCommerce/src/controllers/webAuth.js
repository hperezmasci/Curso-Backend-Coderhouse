import session from 'express-session'
import MongoStore from 'connect-mongo'

import passport from '../services/webAuth.js'
import cfg from '../config.js'

function init(authRouter) {
    authRouter.use(session({
        store: MongoStore.create({
            mongoUrl: cfg.db.cnxStr,
            mongoOptions: cfg.db.options
        }),
        secret: cfg.auth.secret,
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
}

// para usar: authRouter.post('/login, authController.login)
const login =
    passport.authenticate(
        'login',
        {
            successRedirect: '/chat',
            failureRedirect: '/loginerror.html',
            failureFlash: false
        }
    )

// para usar: authRouter.post('/logout', isAuthenticated, authController.logout)
function logout(req, res) {
    const username = passport.username
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.redirect('/logout.html')
    })
}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.redirect('/login.html')
    }
}

export default {
    init,
    login,
    logout,
    isAuthenticated
}