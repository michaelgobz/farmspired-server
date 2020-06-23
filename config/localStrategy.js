const passport = require('passport');
const { MongoClient } = require('mongodb')
const { Strategy } = require('passport-local');

function localstartegy(){
  passport.use(new Strategy(
    {
      emailField: 'email',
      passwordField: 'password'
    }, (email, password ,done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'admin'; 
      (async function checkForUser() {
        try {
          let client
          client = MongoClient.connect(url)

          const db = client.db(dbName);
          const col = db.collection('users');

          const user = await col.findOne({ email })

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
          console.log(email, password)
        } catch (err) {
          console.log(err)
        }
    //close
        client.close()
      }())
    }
  ))
}
module.exports = localstartegy()
