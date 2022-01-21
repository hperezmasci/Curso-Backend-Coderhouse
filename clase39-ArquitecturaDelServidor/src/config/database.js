module.exports = {
    /*
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    */
    // uso esto para poder testear configuraciones (????)
    fn: config => {
        return {
            host: config.DB_HOST || 'localhost',
            port: config.DB_PORT,
            name: config.DB_NAME,
        }
    } 
}