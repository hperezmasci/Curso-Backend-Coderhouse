const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const empresa = {
    id: "1000",
    nombre: "Coderhouse",
    gerente: {
      id: "2",
      nombre: "Pedro",
      apellido: "Mei",
      DNI: "20442639",
      direccion: "CABA 457",
      telefono: "1567811544"
    },
    encargado: {
      id: "3",
      nombre: "Pablo",
      apellido: "Blanco",
      DNI: "20442640",
      direccion: "CABA 458",
      telefono: "1567811545"
    },
    empleados: [
      {
        id: "1",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543"
      },
      {
        id: "2",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20442639",
        direccion: "CABA 457",
        telefono: "1567811544"
      },
      {
        id: "3",
        nombre: "Pablo",
        apellido: "Blanco",
        DNI: "20442640",
        direccion: "CABA 458",
        telefono: "1567811545"
      }
    ]
}

const empleado = new schema.Entity('empleado')

const organigrama = new schema.Entity('organigrama', {
    gerente: empleado,
    encargado: empleado,
    empleados: [ empleado ]
})

const util = require('util')

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

console.log('--- OBJETO NORMALIZADO ---')
const normalizedEmpresa = normalize(empresa, organigrama);
print(normalizedEmpresa)

console.log('--- OBJETO DESNORMALIZADO ---')
const denormalizedEmpresa = denormalize(normalizedEmpresa.result, organigrama, normalizedEmpresa.entities);
print(denormalizedEmpresa)

console.log('Longitud objeto original: ', JSON.stringify(empresa).length)
console.log('Longitud objeto normalizado: ', JSON.stringify(normalizedEmpresa).length)
console.log('Longitud objeto denormalizado: ', JSON.stringify(denormalizedEmpresa).length)

