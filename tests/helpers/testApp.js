// Test-only Express app.
// Mirrors the route mounting done in index.js but without session/passport/
// swagger or the real MongoDB connection, so routes can be tested in isolation.
const express = require("express");

const app = express();

app.use(express.json());
app.use("/", require("../../routes"));

module.exports = app;
