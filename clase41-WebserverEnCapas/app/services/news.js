const newsModel = require('../models/news')

module.exports = {
   find: async () => {
     return newsModel.find()
   },
   findById: async (id) => {
     const newsFound = await newsModel.findById(id)

     if (!newsFound) {
       throw new Error('Noticia no encontrada')
     }
     return newsFound
   },
   create: async (data) => {
     data.createdAt = new Date()
     data.updatedAt = new Date()
     let item = new newsModel(data)
     return item.save()
   },
   update: async (id, data) => {
    data.updatedAt = new Date()
    const response = await newsModel.findOneAndUpdate({ _id: id }, data, { rawResult: true })

    if (!response.value) {
      throw new Error('Noticia no encontrada')
    }
    return response.value
  },
  delete: async (id) => {
    const response = await newsModel.findOneAndDelete({ _id: id })

    if (!response) {
      throw new Error('Noticia no encontrada')
    }

    return response
  }
}