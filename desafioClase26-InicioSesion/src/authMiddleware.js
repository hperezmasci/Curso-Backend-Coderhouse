import passport from 'passport'
import passportLocal from 'passport-local'
import bCrypt from 'bcrypt';

import UsersDaoMongoDB from './daos/UsersDaoMongoDB.js'

const createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

const Users = new UsersDaoMongoDB();

const LocalStrategy = passportLocal.Strategy

passport.use(
    'register',
    new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        return Users.getByUsername(username)
        .then(user => {
            if (user) {
                return done(null, false, { message: 'El nombre de usuario ya existe' })
            }
            return Users.save({
                username: username,
                password: createHash(password)
            })
        })
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
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
   
function isAuthenticated(req, res, next) {
    if (req.session && req.session.username) {
        next()
    }
    else {
        res.redirect('/login.html')
    }
}

export { passport, isAuthenticated }