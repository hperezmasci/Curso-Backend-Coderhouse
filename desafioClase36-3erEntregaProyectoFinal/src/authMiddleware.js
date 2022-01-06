import passport from 'passport'
import passportLocal from 'passport-local'
import bCrypt from 'bcrypt'
import { isValidPhoneNumber } from 'libphonenumber-js'

import UsersDaoMongoDB from './daos/UsersDaoMongoDB.js'

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

const isValidPassword = (userPassword, password) => {
    return bCrypt.compareSync(password, userPassword)
}

const Users = new UsersDaoMongoDB();

const LocalStrategy = passportLocal.Strategy

passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
        return Users.getByUsername(username)
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario incorrecto' })
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
            passport.username = user.username
            return done(null, user)
        })
        .catch(err => done(err))
    }
))

passport.use(
    'register',
    new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        return Users.getByUsername(username)
        .then(user => {
            if (user) {
                console.log('usuario existe')
                return done(null, false, {message: 'El nombre de usuario ya existe'})
            }
            if (!isValidPhoneNumber(req.body.phone)) {
                console.log('nro invalido')
                return done(null, false, {message: 'Numero de telefono invalido'})
            }
            /*
            if (!req.file) {
                console.log('no envía archivo')
                return done(null, false, {message: 'Falta cargar archivo a subir'})
            }
            */
            return Users.save({
                username:   username,
                password:   createHash(password),
                name:       req.body.name,
                address:    req.body.address,
                age:        req.body.age,
                phone:      req.body.phone
            })
            .then(user => {
                passport.username = username
                return done(null, user)
            })
        })
        .catch(err => {
            console.log('err')
            return done(err)
        })
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})
   
passport.deserializeUser((id, done) => {
    Users.getById(id)
    .then(user => {
        return done(null, user)
    })
    .catch(err => {
        return done(err)
    })
})

export default passport