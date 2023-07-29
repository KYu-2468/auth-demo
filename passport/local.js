const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../db");

// Passport local strategy for authentication
passport.use(
  new LocalStrategy(
    // Telling passport to use email and password instead of username and password
    { usernameField: "email", passwordField: "password" },

    // Callback function to be called to verify user
    verify
  )
);

// Verify function for passport local strategy
async function verify(email, password, done) {
  try {
    // Make sure email exists and the user is a local user (not OAuth)
    const user = await User.findOne({
      where: { email: email, provider: "local" },
    });

    if (!user) {
      return done(null, false, { message: "No username found!" });
    }

    const isCorrectPassword = await user.verifyPassword(password);

    if (!isCorrectPassword) {
      return done(null, false, { message: "Incorrect password!" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

module.exports = passport;
