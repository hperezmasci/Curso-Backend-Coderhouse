import dotenv from 'dotenv'
dotenv.config()

const atlasCreds = {
    user: process.env.ATLAS_USER,
    password: process.env.ATLAS_PASSWORD
}
if (!atlasCreds.user || !atlasCreds.password) {
    throw new Error('config: missing user or password for atlas connection string')
}

const config = {
    'mongodb': {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'atlas': {
        cnxStr: `mongodb+srv://${atlasCreds.user}:${atlasCreds.password}@cluster0.mev0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

export default config