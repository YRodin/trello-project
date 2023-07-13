const passport = require("passport");
const User = require("../models/user");
const keys = require("../config/keys");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");

// Local Strategy
const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify email and password, call done with user if correct
  User.findOne({ email: email }).then((user) => {
    // if (err) { return done(err); }
    if (!user) { return done(null, false) }

    if (!user.validPassword(password)) {
      return done(null, false, { message: "Incorrect password." })
    }

    return done(null, user);
  })
});

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user ID in payload exist in out DB
  User.findById(payload.sub).then((user) => {
    // if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);