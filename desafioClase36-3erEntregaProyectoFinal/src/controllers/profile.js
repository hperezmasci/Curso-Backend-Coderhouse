import productsService from '../services/profile.js'

async function getProfile(req, res) {
    try {
        const username = req.username
        const user = await productsService.getProfile(username)
        res.render('profile', {user})
    }
    catch (err) {logger.error(`cpntrollers.products.getProducts: ${err}`)}
}

export default {
    getProfile
}