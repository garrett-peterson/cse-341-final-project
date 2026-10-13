const express = require("express");
const router = express.Router();

const furnitureController = require("../../controllers/furniture");
const { requiresAuth } = require("../../middleware/authenticate");
const {
  idMiddleware,
  furnitureMiddleware,
} = require("../../middleware/validateFurniture");
router.get("/", furnitureController.getAll);
router.get("/:id", idMiddleware, furnitureController.getSingle);
router.post(
  "/",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  furnitureMiddleware,
  furnitureController.createFurniture,
);
router.put(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  furnitureMiddleware,
  furnitureController.updateFurniture,
);
router.delete(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  furnitureController.deleteFurniture,
);

module.exports = router;
