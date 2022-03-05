import dotenv, { config } from 'dotenv'
import path from 'path'

/***
 * dotenv configuration
 */

const node_env = process.env.NODE_ENV || 'development'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.info(`Environment: ${node_env}`)

dotenv.config({
    path: path.resolve(__dirname, `${node_env}.env`)
})

/***
 * Validate environment variables
 */

const secret = process.env.SECRET
if (!secret) throw new Error('config: Missing SECRET environment variable')

const admin = process.env.ADMIN
if (!admin) throw new Error('config: Missing ADMIN environment variable')

const enable_notifications = (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASSWORD) ? true : false
console.info(`Notifications enabled: ${enable_notifications}`)

/***
 * General configuration (editable)
 */

const conf = {
    node_env,
    admin,
    notifications: process.env.NOTIFICATIONS || admin,
    server: {
        port: process.env.PORT || 8080
    },
    auth: {
        secret,
        expire: parseInt(process.env.EXPIRE) || 60
    },
    db: {
        cnxStr: process.env.DB_CNXSTR || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    notifications: (!enable_notifications) ?
        null :
        {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASSWORD
            },
            sender: process.env.SENDER || 'eCommerce@yopmail.com'
        }
}

export default conf