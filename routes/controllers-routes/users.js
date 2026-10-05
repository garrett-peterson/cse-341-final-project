const express = require("express");
const router = express.Router();


const usersController = require("../../controllers/users");
const { requiresAuth } = require("../../middleware/authenticate");
const {
  idMiddleware,
  usersMiddleware,
} = require("../../middleware/validateUsers");
router.get("/", usersController.getAll);
router.get("/:id", idMiddleware, usersController.getSingle);
router.post(
  "/",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  usersMiddleware,
  usersController.createUser,
);
router.put(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  usersMiddleware,
  usersController.updateUser,
);
router.delete(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  usersController.deleteUser,
);

module.exports = router;
