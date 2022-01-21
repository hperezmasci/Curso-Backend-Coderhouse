module.exports = {
    fn: config => {
      return {
        host: config.DB_HOST,
        user: config.DB_USER,
        pass: config.DB_PASS,
        port: config.DB_PORT || 27017,
        name: config.DB_NAME || 'clase41'
      }
    }
  }
 