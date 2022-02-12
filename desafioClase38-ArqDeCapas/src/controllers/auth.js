import session from 'express-session'
import MongoStore from 'connect-mongo'

import passport from '../services/auth.js'
import conf from '../config.js'

// para usar authRouter.use(sessionInit())
function init(authRouter) {
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
}

// para usar: authRouter.post('/register, authController.register)
const register =
    passport.authenticate(
        'register',
        {
            successRedirect: '/',
            failureRedirect: '/registererror.html',
            failureFlash: false
        }
    )

// para usar: authRouter.post('/login, authController.login)
const login =
    passport.authenticate(
        'login',
        {
            successRedirect: '/',
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
        res.render('logout.handlebars', {username})
    })
}

// para usar: authRouter.get('/', isAuthenticated, authController.getIndex)
function getIndex(req, res) {
    res.render('index.handlebars', {username: passport.username})
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
    register,
    login,
    logout,
    getIndex,
    isAuthenticated,
}