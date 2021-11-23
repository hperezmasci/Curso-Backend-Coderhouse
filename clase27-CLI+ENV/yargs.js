const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs
  .alias({
    n: 'nombre',
    a: 'apellido'
  })
  .default({
    nombre: 'pepe',
    a: 'copado'
  })
 .argv

console.log(args)
