const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");

passport.use(
  new GoogleStrategy(
    {
      // Get Google client id and secret from https://console.cloud.google.com/getting-started
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        (process.env.BACKEND_URL || process.env.BACKEND_URL_LOCAL) +
        "/auth/login/google/callback",
    },
    verify
  )
);

// Verify function for passport google strategy
// This function will be called once they signed in to google successfully
// Google will pass tokens and minimal user information to us
async function verify(accessToken, refreshToken, profile, done) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { socialId: profile.id },
      defaults: {
        socialId: profile.id,
        email: profile.emails[0].value,
        provider: profile.provider,
        accessToken,
        refreshToken,
      },
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

module.exports = passport;
