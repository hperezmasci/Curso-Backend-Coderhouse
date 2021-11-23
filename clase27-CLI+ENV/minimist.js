const parseArgs = require('minimist')

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const args = parseArgs(process.argv.slice(2))

console.log(args)

/*  entrada:
        node .\minimist.js uno 2 --nombre iram -v 2 --debug --version asdf 3
    salida:
        {
        _: [ 'uno', 2, 3 ],
        nombre: 'iram',
        v: 2,
        debug: true,
        version: 'asdf'
        }

    Los argumentos "sueltos" se agrupan en un array posicional con el nombre "_"
    Los argumentos con "-" o "--" pueden llevar o no valor. Si no lo llevan su valor es true
*/

options = { alias: { a: 'campoA', b: 'campoB'}, default: { nombre: 'pepe', apellido: 'gomez'}}

console.log(parseArgs(['-a', 1, '-b', 2, '--apellido', 'perez'], options))

/*
    Aquí usamos alias (a es alias de campoA y b es aias de campoB, y los valores se asignan a ambos por igual) y valores por defecto (y estoy pisando apellidos)

    La salida es:
    
    {
    _: [],
    a: 1,
    campoA: 1,
    b: 2,
    campoB: 2,
    apellido: 'perez',
    nombre: 'pepe'
    }
*/