// ESTA INCOMPLETO, LO SUBE EN EL REPO

module.exports = () => {
    return new Promise((resolve, reject) => {
        // esta promesa falla siempre
        return reject(new Error('promise rejected'))
    })
}