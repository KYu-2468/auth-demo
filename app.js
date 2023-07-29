// Import env variables from .env
require("dotenv").config();

// Logging middleware
const morgan = require("morgan");

const express = require("express");

// Enable cors so frontend domain have access to backend domain
const cors = require("cors");

// Helmet middleware modified http headers for better security
const helmet = require("helmet");

const configurePassport = require("./passport");

const app = express();
configureMiddleware(app);
configurePassport(app);

module.exports = app;

function configureMiddleware(app) {
  // Enable helmet middleware for better http headers security
  app.use(helmet());

  // enbale cors and cookies via cors
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || process.env.FRONTEND_URL_LOCAL,
      credentials: true,
      allowedHeaders:
        "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      preflightContinue: true,
    })
  );

  // trust proxy from hosting services like vercel to send cookies over https
  app.enable("trust proxy"); // or app.set("trust proxy", 1);

  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

// routing for authentication
app.use("/auth", require("./auth"));

// routing for api
app.use("/api", require("./api"));

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send(err.message);
});
