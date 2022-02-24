import cfg from '../config.js'
import authService from '../services/auth.js'

async function register(req, res) {
    const { username, password, name } = req.body
    if (!username || !password) return res.status(400).json({error: 'Bad request'})

    try {
        const access_token = await authService.register({username, password, name})
        res.json({access_token})
    }
    catch (e) {
        if (authService.Errors[e.message]) {
            const code = e.message === 'USER_EXIST' ? 409 : 400
            return res.status(code).json({error: authService.Errors[e.message]})
        }
        console.error(`controller.auth.register: ${e}`)
        return res.status(500).json({error: 'Unexpected error'})
    }
}

async function login(req, res) {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({error: 'Bad request'})

    try {
        const access_token = await authService.login(username, password)
        res.json({username, access_token})
    }
    catch (e) {
        if (authService.Errors[e.message])
            return res.status(401).json({error: authService.Errors[e.message]})
        console.error(`controller.auth.login: ${e.message}`)
        return res.status(500).json({error: 'Unexpected error'})
    }
}

function auth(req, res, next) {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || ''
  
    if (!authHeader)
        return res.status(401).json({error: 'Missing authentication header'})
        
    const token = authHeader.split(' ')[1]
  
    if (!token)
        return res.status(401).json({error: 'Missing authentication token'})
  
    try {
        req.username = authService.auth(token, req.adminCheck)
    }
    catch (e) {
        if (e.message === 'UNAUTHORIZED')
            return res.status(403).json({error: 'Admin access only'})
        return res.status(401).json({error: `Invalid Token - ${e.message}`})
    }
  
    next();
}

function adminAuth(req, res, next) {
    req.adminCheck = true
    auth(req, res, next)
}

export default {
    register,
    login,
    auth,
    adminAuth
}