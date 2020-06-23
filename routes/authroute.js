const router = require('express').Router()
const { MongoClient } = require('mongodb')
const debug = require('debug')('app:authRoutes');
const passport = require('passport')
const CLIENT_END_POINT = "http://localhost:1234"
// sign up post
function routes() {
  router.post('/signup', (req, res) => {
    // register a user here
    const { firstname, Secondname, Address,email, password } = req.body
    // connection
    const url = 'mongodb://127.0.0.1:27017';

    (async function addNewUser() {
      let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true })
          debug('database connection is success full')

          const db = client.db('admin')
          const user = { firstname, Secondname, Address, email, password }
          const coll = db.collection('users')
          const result = await coll.insertOne(user)
          // we login in the user if success full
          req.login(result.ops[0], () => {
            res.send('you  are now logged in ')
          });
          console.log(result)
        }catch(err){
          debug(result)        
        }
     })()

  })
  // login post 
  router.post('/login/userID', (passport.authenticate('local', {
    successRedirect: CLIENT_END_POINT,
    failureRedirect: ''
  })))

  router.get('/logout', (req, res) => {
    res.json({
      "user": "122332233",
      "status": "has been logged out"
    })
  })

  router.post('/editProfile', (req, res) => {
     // allow edit of the user profile
    res.json(req.body)
    console.log(req.body)
  })
  
  return router
}

module.exports = routes()
