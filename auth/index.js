const router = require("express").Router();
const passport = require("passport");
const { User } = require("../db");

// base-url/auth
module.exports = router;

router.use("/signup", require("./signup"));

router.use("/login", require("./login"));

router.use("/logout", require("./logout"));

router.get("/fail", (req, res, next) => {
  res.status(401).send("Authentication Failed!");
});

// If user login success, redirect back to frontend url's dashboard route
router.get("/success", (req, res, next) => {
  res.redirect(
    (process.env.FRONTEND_URL || process.env.FRONTEND_URL_LOCAL) + "/dashboard"
  );
});

//  If user is authenticated using passport.js cookies, return the user information
router.get("/me", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});
