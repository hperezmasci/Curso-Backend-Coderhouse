import { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import multer from 'multer'

import passport from './authMiddleware.js'
import conf from './config.js'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'../uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage});

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
    upload.single('avatar'),
    passport.authenticate(
        'register',
        {
            successRedirect: '/',
            failureRedirect: '/registererror.html',
            failureFlash: false
        }
    )
)

authRouter.post(
    '/login',
    passport.authenticate(
        'login',
        {
            successRedirect: '/',
            failureRedirect: '/loginerror.html',
            failureFlash: false
        }
    )
)

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.redirect('/login.html')
    }
}

authRouter.get('/', isAuthenticated, (req, res) => {
    res.render('home.hbs', {username: passport.username})
    //res.send(`Bienvenido ${passport.username}`)
})

authRouter.post('/logout', isAuthenticated, (req, res) => {
    const username = passport.username
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.render('logout.hbs', {username})
    })
})

export default authRouter