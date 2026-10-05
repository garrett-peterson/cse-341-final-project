const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['food']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("food")
      .find();
    res.setHeader("Content-Type", "application/json");

    const food = await result.toArray();
    res.status(200).json(food);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['food']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const clothingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("food")
      .find({ _id: clothingId });
    res.setHeader("Content-Type", "application/json");

    const food = await result.toArray();

    if (food.length > 0) {
      res.status(200).json(food[0]);
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  //#swagger.tags=['food']
  try {
    const food = {
      id: req.body.inMarketId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      expirationDate: req.body.expirationDate,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("food")
      .insertOne(food);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: "food couldn't be created" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  //#swagger.tags=['food']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const foodId = new ObjectId(req.params.id);
    const food = {
      id: req.body.inMarketId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      expirationDate: req.body.expirationDate,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("food")
      .replaceOne({ _id: foodId }, food);
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  //#swagger.tags=['food']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const foodId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("food")
      .deleteOne({ _id: foodId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createFood,
  updateFood,
  deleteFood,
};
