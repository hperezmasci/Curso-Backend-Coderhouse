import log4js from 'log4js'

log4js.configure({
    appenders: {
      default: { type: 'console' },
      console: { type: 'console' },
      file: { type: 'file', filename: '../logs/app.log' }
    },
    categories: {
      default: { appenders: ['console'], level: 'trace' },
      console: { appenders: ['console'], level: 'debug' },
      file: { appenders: ['file'], level: 'info' },
      all: { appenders: ['file', 'console'], level: 'warn' }
    }
})

const logger = log4js.getLogger('all');

export default logger
  