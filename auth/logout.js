const { cookie } = require("../config");

const router = require("express").Router();

// http://localhost:8080/auth
module.exports = router;

router.post("/", async function (req, res, next) {
  try {
    // Use passport.js function to logout, removing passport information from session/cookie thus disabling session
    req.logout(function (err) {
      if (err) {
        return next(err);
      }

      // destroys session from the server side
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }

        // removes cookies in the client side, basically setting the expiration to the past and let browser automatically delete it
        res.clearCookie("Passport-cookie", { ...cookie, maxAge: 0 });

        res.status(200).send("Logout Success!");
      });
    });
  } catch (error) {
    console.log(error);
  }
});
