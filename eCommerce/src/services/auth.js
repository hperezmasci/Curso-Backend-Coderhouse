import jwt from 'jsonwebtoken'
import bCrypt from 'bcrypt'

import cfg from '../config.js'
import UsersDao from '../daos/UsersMongoDB.js'
import sendMail from '../messaging/mail.js'

const Errors = {
    NO_USER: 'Username is missing',
    NO_PASS: 'Password is missing',
    USER_EXIST: 'User already exists',
    INVALID_EMAIL: 'Invalid Username format, must be a valid email',
    WRONG_PASS: 'Invalid credentials',
    NOT_EXIST: 'Invalid credentials',
    UNAUTHORIZED: 'Admin access only'
}

const Users = UsersDao.getInstance()

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

const isValidPassword = (userPassword, password) => {
    return bCrypt.compareSync(password, userPassword)
}

function generateToken(data) {
    console.log('expire: ', cfg.auth.expire)
    const token = jwt.sign(data, cfg.auth.secret, { expiresIn: cfg.auth.expire })
    return token
}

function auth(token, adminCheck) {
    try {
        const user = jwt.verify(token, cfg.auth.secret)
        if (adminCheck && !(user.username === cfg.admin))
            throw new Error('UNAUTHORIZED')
        return user.username
    }
    catch (e) {throw new Error(e.message)}
}

async function register(user) {
    const { username, password, name} = user

    if (username === undefined) throw new Error('NO_USER')
    if (password === undefined) throw new Error('NO_PASS')

    const usr = await Users.getByUsername(username)
    if (usr) throw new Error('USER_EXIST')

    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(username)) throw new Error('INVALID_EMAIL')

    user.password = createHash(password)

    Users.save(user)

    const access_token = generateToken({username})

    const subject = `Nuevo usuario registrado: ${username}`
    await sendMail({
        from: 'eCommerce@yopmail.com',
        to: cfg.admin,
        subject,
        text: ''
    })
    
    return access_token
}

async function createToken(username, password) {
    const user = await Users.getByUsername(username)

    if (!user) throw new Error('NOT_EXIST')
    if (!isValidPassword(user.password, password)) throw new Error('WRONG_PASS')

    const access_token = generateToken({username})
    return access_token
}

export default {
    Errors,
    auth,
    register,
    createToken
}