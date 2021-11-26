console.log(`
    Directorio actual de trabajo: ${process.cwd()}
    execPath: ${process.execPath}
    ID del proceso: ${process.pid}
    Versión de node: ${process.version}
    Título del proceso: ${process.title}
    Sistema operativo: ${process.platform}
    Uso de la memoria: ${JSON.stringify(process.memoryUsage())}
`)

/*
  salir de forma inmediata:
  process.exit() // que es lo mismo que pasarle 0 como argumento

  Podría pasarse un argumento para que devuelva un valor distinto de cero (código de salida, gralmente asociado a un error)
*/

process.on('beforeExit', (code) => {
    // no entra aquí si llamamos a process.exit()
    // sólo si sale si el proceso termina de forma normal
    // por ahí el nombre del evento es confuso
    console.log('Process beforeExit event with code: ', code)
})

process.on('exit', (code) => {
    // este sí se llama al llamar a process.exit(x)
    console.log('About to exit with code: ', code)
})

