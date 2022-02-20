import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SECRET

if (!secret) throw new Error('config: Missing environment variable SECRET')

const conf = {
    server: {
        port: process.env.PORT || 8080
    },
    auth: {
        secret: secret,
        expire: '60s'
    }
}

export default conf