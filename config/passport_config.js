const passport = require('passport')
require('../config/localStrategy.js')
function passportConfig(app) {

  app.use(passport.initialize())
  app.use(passport.session())

  // store
  passport.serializeUser((done, user) => {
    done(null, user)
  });

  // we retirve the user
  passport.deserializeUser((done, user) => {
    done(null, user);
  });
}

module.exports = passportConfig
