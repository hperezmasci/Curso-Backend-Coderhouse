const config = {
    'mongodb': {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'mariadb': {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            //password: 'password',
            database: 'test'
        }
    },
    'sqlite': {
        client: 'sqlite3',
        connection: {
          filename: "./DB/ecommerce.sqlite"
        },
        useNullAsDefault: true
    }
}

export default config