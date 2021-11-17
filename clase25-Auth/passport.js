const express = require('express')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const expressSession = require('express-session')

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        return User.findOne({ username })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario incorrecto' })
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
            return done(null, user)
        })
        .catch(err => done(err))
    }
))

const isValidPassword = (userPassword, password) => {
    return bCrypt.compareSync(password, userPassword)
}

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    (req, username, password, done) => {
        return User.findOne({ username })
        .then(user => {
            if (user) {
                return done(null, false, { message: 'El nombre de usuario ya existe' })
            }
            let newUser = new User()
            newUser.username = username
            newUser.password = createHash(password)
            newUser.email = req.body.email
            return newUser.save()
        })
    }
))
   
// Falta pegar código de las diapos (o ver la resolución del repo)