newsService = require('../services/news')

module.exports = {
    all: async (req, res) => {
      try {
        const news = await newsService.find()
        return res.json(news)
      } catch (e) {
        return res.status(500).json({ err: e.message })
      }
    },
    getOne: async (req, res) => {
      try {
        const { id } = req.params
        const newsFound = await newsService.findById(id)
        return res.json(newsFound)
      } catch (e) {
        return res.status(500).json({ err: e.message })
      }
    },
    create: async (req, res) => {
      try {
        const newsCreated = await newsService.create(req.body)
        return res.json(newsCreated)
      } catch (e) {
        return res.status(500).json({ err: e.message })
      }
    },
    update: async (req, res) => {
        try {
          const { id } = req.params
          const newsUpdated = await newsService.update(id, req.body)
          return res.json(newsUpdated)
        } catch (e) {
          return res.status(500).json({ err: e.message })
        }
      },
      delete: async (req, res) => {
        try {
          const { id } = req.params
          const newsDeleted = await newsService.delete(id)
          return res.json(newsDeleted)
        } catch (e) {
          return res.status(500).json({ err: e.message })
        }
      }
   }
    