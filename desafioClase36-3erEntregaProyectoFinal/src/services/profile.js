import UsersDao from '../daos/UsersMongoDB.js'

const Users = UsersDao.getInstance()

async function getProfile(username) {
    try {
        const user = await Users.getByUsername(username)
        return user
    }
    catch (err) {throw new Error(`services.profile.getProfile: ${err}`)}
}

export default {
    getProfile
}