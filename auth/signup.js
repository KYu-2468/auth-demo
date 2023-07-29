const router = require("express").Router();
const passport = require("passport");
const { User } = require("../db");

// http://localhost:8080/auth
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("Invalid Email and Password!");
    }

    const user = await User.create({
      email: email,
      password: password,
    });

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth/me");
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(409).send("User already exists");
    } else {
      next(err);
    }
  }
});
