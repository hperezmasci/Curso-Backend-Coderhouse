function randomValues(cant) {
    const result = {}
    for (let i=0; i < cant; i++) {
        const rnd = Math.ceil((Math.random() * 1000))
        result[rnd] = result[rnd] === undefined ? 1 : result[rnd] + 1
    }
    return result
}

process.on('message', cant => {
    process.send(randomValues(cant))
    process.exit()
})

// mensaje de child inicializado
process.send('done')

