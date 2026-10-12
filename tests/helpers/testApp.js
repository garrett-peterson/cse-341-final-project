// Test-only Express app.
// Mirrors the route mounting done in index.js but without session/passport/
// swagger or the real MongoDB connection, so routes can be tested in isolation.
const express = require("express");

// Controllable fake Passport state. Tests flip these flags to exercise the
// logged-in and logged-out branches of routes that call req.isAuthenticated().
const authState = {
  isAuthenticated: false,
  user: null,
};

const app = express();

app.use(express.json());

// Inject a Passport-like API so routes can be tested without the real
// session/passport/DB wiring. Defaults to "logged out".
app.use((req, res, next) => {
  req.isAuthenticated = () => authState.isAuthenticated;
  req.user = authState.user;
  next();
});

app.use("/", require("../../routes"));

module.exports = app;
module.exports.authState = authState;
