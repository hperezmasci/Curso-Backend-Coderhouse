import authService from '../services/auth.js'

function register(req, res) {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({error: 'Bad request'})

    try {
        const access_token = authService.register(username, password)
        res.json({access_token})
    }
    catch (e) {
        if (e.message === 'EXIST')
            return res.status(409).json({error: 'User already exists'});
        else
            return res.status(500).json({error: 'Unexpected error'})
    }
}

function login(req, res) {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({error: 'Bad request'})

    try {
        const access_token = authService.login(username, password)
        res.json({username, access_token})
    }
    catch (e) {
        console.log(e.message)
        if (e.message === 'NOTEXIST' || e.message === 'WRONGPASS')
            return res.status(409).json({error: 'Invalid credentials'})
        else 
            return res.status(500).json({error: 'Unexpected error'})
    }
}

export default {
    register,
    login
}