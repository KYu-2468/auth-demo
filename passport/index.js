const passport = require("passport");

// use to store sessions and cookie information in postgre db
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { cookie } = require("../config");

// Making sure local passport middleware is setup
require("./local");

// Making sure google passport middleware is setup
require("./google");

const { db } = require("../db");

module.exports = function configurePassport(app) {
  // express-session to store sessions / cookies in database

  app.use(
    session({
      // database to keep track of sessions
      store: new SequelizeStore({
        db: db,
        checkExpirationInterval: 24 * 60 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
        expiration: 7 * 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
      }),
      name: "Passport-cookie",
      secret: process.env.SESSION_SECRET || "keyboard cat",
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: cookie,
    })
  );

  // Defining what user information should be stored in the session
  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
        type: user.type,
      });
    });
  });

  // Deserialize user from session storage
  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, user);
    });
  });

  // Initialize passport middleware
  app.use(passport.initialize());

  // persistent login sessions
  app.use(passport.session());
};
