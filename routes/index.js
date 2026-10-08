const express = require("express");
const router = express.Router();

// Aliases so /login and /logout match the course example (Auth0 registers
// those routes automatically). Here the real flow lives under /auth and runs
// on Passport, so these top-level routes simply redirect to it.
router.get("/login", (req, res) => res.redirect("/auth/github"));
router.get("/logout", (req, res) => res.redirect("/auth/logout"));

router.use("/clothings", require("./controllers-routes/clothings"));
router.use("/food", require("./controllers-routes/food"));
router.use("/furniture", require("./controllers-routes/furniture"));
router.use("/users", require("./controllers-routes/users"));

router.get("/", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.displayName}`);
  } else {
    res.send("API is working!");
  }
});

module.exports = router;
