const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['furniture']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("furniture")
      .find();
    res.setHeader("Content-Type", "application/json");

    const furniture = await result.toArray();
    res.status(200).json(furniture);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['furniture']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const clothingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("furniture")
      .find({ _id: clothingId });
    res.setHeader("Content-Type", "application/json");

    const furniture = await result.toArray();

    if (furniture.length > 0) {
      res.status(200).json(furniture[0]);
    } else {
      res.status(404).json({ message: "furniture not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const createFurniture = async (req, res) => {
  //#swagger.tags=['furniture']
  try {
    const furniture = {
      id: req.body.inMarketId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      material: req.body.material,
      dimensions: req.body.dimensions,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("furniture")
      .insertOne(furniture);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: "furniture couldn't be created" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const updateFurniture = async (req, res) => {
  //#swagger.tags=['furniture']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const furnitureId = new ObjectId(req.params.id);
    // Same shape as createFurniture above: replaceOne swaps the whole
    // document, so the fields here have to match the furniture model.
    const furniture = {
      id: req.body.inMarketId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      material: req.body.material,
      dimensions: req.body.dimensions,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("furniture")
      .replaceOne({ _id: furnitureId }, furniture);
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "furniture not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const deleteFurniture = async (req, res) => {
  //#swagger.tags=['furniture']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const furnitureId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("furniture")
      .deleteOne({ _id: furnitureId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "furniture not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createFurniture,
  updateFurniture,
  deleteFurniture,
};
