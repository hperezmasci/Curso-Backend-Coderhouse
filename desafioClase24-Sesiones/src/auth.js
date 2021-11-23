function isAuthenticated(req, res, next) {
    if (req.session && req.session.username) {
        next()
    }
    else {
        res.redirect('/login.html')
    }
}

export default isAuthenticated