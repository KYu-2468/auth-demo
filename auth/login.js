const router = require("express").Router();
const passport = require("passport");

// http://localhost:8080/auth
module.exports = router;

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/auth/fail",
    failureMessage: true,
  }),
  (req, res, next) => {
    res.redirect("/auth/me");
  }
);

// user sign in with google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// If user login success in google, google will redirect to this uri
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/fail" }),
  function (req, res) {
    // Successful authentication, redirect /auth/success
    res.redirect("/auth/success");
  }
);
