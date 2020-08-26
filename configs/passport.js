const Usuario          = require('../models/usuario-modelo.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs'); // !!!
const passport      = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  Usuario.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});


  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {  
  Usuario.findOne({ email:email}, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }

    next(null, foundUser);
  });
}));


