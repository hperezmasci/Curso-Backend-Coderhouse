import { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import multer from 'multer'

import passport from '../services/auth.js'
import conf from '../config.js'
import productsController from '../controllers/products.js'
import cartController from '../controllers/cart.js'

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

const webRouter = new Router()

// sessions
webRouter.use(session({
    store: MongoStore.create({
        mongoUrl: conf.atlas.cnxStr,
        mongoOptions: conf.atlas.options
    }),
    secret: 'shhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true, // para refrescar el ttl cada vez que se interactúa con la sesión
    cookie: {
        maxAge: 3600000   // msec. Esto puede obviarse y la cookie toma la duración de la sesión
                          // si este está seteado, hace un override del ttl de la sesión
    }
}))

webRouter.use(passport.initialize())
webRouter.use(passport.session())
// XXX FIXE: se usa?
//webRouter.use(flash())

webRouter.post(
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

webRouter.post(
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
    // descomentar para entrar sin login
    //return next()
    if (req.isAuthenticated()) {
        req.username = passport.username
        next()
    }
    else {
        res.redirect('/login.html')
    }
}

webRouter.post('/logout', isAuthenticated, (req, res) => {
    const username = passport.username
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.render('logout.hbs', {username})
    })
})

webRouter.get('/', isAuthenticated, (req, res) => {
    res.render('home.hbs', {username: passport.username})
})

webRouter.get('/products', isAuthenticated, productsController.getProducts)
webRouter.post('/product', isAuthenticated, cartController.addProduct)
webRouter.get('/cart', isAuthenticated, cartController.getCart)
webRouter.post('/cart', isAuthenticated, cartController.processCart)

export default webRouter