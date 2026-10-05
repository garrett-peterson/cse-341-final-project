const express = require("express");
const router = express.Router();

const foodController = require("../../controllers/food");
const { requiresAuth } = require("../../middleware/authenticate");
const {
  idMiddleware,
  foodMiddleware,
} = require("../../middleware/validateFood");
router.get("/", foodController.getAll);
router.get("/:id", idMiddleware, foodController.getSingle);
router.post(
  "/",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  foodMiddleware,
  foodController.createFood,
);
router.put(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  foodMiddleware,
  foodController.updateFood,
);
router.delete(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  foodController.deleteFood,
);

module.exports = router;
