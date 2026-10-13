const express = require("express");
const router = express.Router();


const clothingsController = require("../../controllers/clothings");
const { requiresAuth } = require("../../middleware/authenticate");
const {
  idMiddleware,
  clothingsMiddleware,
} = require("../../middleware/validateClothings");
router.get("/", clothingsController.getAll);
router.get("/:id", idMiddleware, clothingsController.getSingle);
router.post(
  "/",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  clothingsMiddleware,
  clothingsController.createClothing,
);
router.put(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  clothingsMiddleware,
  clothingsController.updateClothing,
);
router.delete(
  "/:id",
  //#swagger.security = [{ "sessionAuth": [] }]
  requiresAuth,
  idMiddleware,
  clothingsController.deleteClothing,
);

module.exports = router;
