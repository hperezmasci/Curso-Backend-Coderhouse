const log4js = require('log4js')

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      miLoggerFile: { type: 'file', filename: 'info.log' },
      miLoggerFile2: { type: 'file', filename: 'info2.log' }
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "trace" },
      consola: { appenders: ["miLoggerConsole"], level: "debug" },
      archivo: { appenders: ["miLoggerFile"], level: "warn" },
      archivo2: { appenders: ["miLoggerFile2"], level: "info" },
      todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" },
      todos2: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "fatal" }
    }
})

const logger = log4js.getLogger() // categoría por defecto, en este caso loguea a partir de trace
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");

const logger2 = log4js.getLogger('consola') // categoría por defecto, en este caso loguea a partir de trace
logger2.trace("Entering cheese testing");
logger2.debug("Got cheese.");
logger2.info("Cheese is Comté.");
logger2.warn("Cheese is quite smelly.");
logger2.error("Cheese is too ripe!");
logger2.fatal("Cheese was breeding ground for listeria.");

const logger3 = log4js.getLogger('archivo2') // categoría por defecto, en este caso loguea a partir de trace
logger3.trace("Entering cheese testing");
logger3.debug("Got cheese.");
logger3.info("Cheese is Comté.");
logger3.warn("Cheese is quite smelly.");
logger3.error("Cheese is too ripe!");
logger3.fatal("Cheese was breeding ground for listeria.");

const logger4 = log4js.getLogger('todos2') // categoría por defecto, en este caso loguea a partir de trace
logger4.trace("Entering cheese testing");
logger4.debug("Got cheese.");
logger4.info("Cheese is Comté.");
logger4.warn("Cheese is quite smelly.");
logger4.error("Cheese is too ripe!");
logger4.fatal("Cheese was breeding ground for listeria.");