import jwt from 'jsonwebtoken'

import cfg from '../config.js'

const users = []

function generateToken(username) {
    const token = jwt.sign({ username }, cfg.auth.secret, { expiresIn: cfg.auth.expire });
    return token;
}

function register(username, password) {
    const user = users.find(user => user.username == username)
    if (user) throw new Error('EXIST')

    users.push({username, password})
    const access_token = generateToken(username)
    return access_token
}

function login(username, password) {
    const user = users.find(user => user.username == username)
    if (!user) throw new Error('NOTEXIST')

    if (!user.password == password) throw new Error('WRONGPASS')

    const access_token = generateToken(username)
    return access_token
}

export default {
    register,
    login
}