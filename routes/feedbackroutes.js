const router = require('express').Router()

function routes() {

  router.post('/contactMessage', (req, res) => {
    // here we record the message of the user
    res.json(req.body)
  })

  //  ask a question feature
  router.post('/askQuestion', (req, res) => {
    res.json(req.body)

  })

  return router
}

module.exports = routes()
