const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    res.setHeader("Content-Type", "application/json");

    const users = await result.toArray();
    res.status(200).json(users);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const clothingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .find({ _id: clothingId });
    res.setHeader("Content-Type", "application/json");

    const users = await result.toArray();

    if (users.length > 0) {
      res.status(200).json(users[0]);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const user = {
      id: req.body.employeeId,
      fname: req.body.fname,
      lname: req.body.lname,
      role: req.body.role,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: "user couldn't be created" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['users']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      id: req.body.employeeId,
      fname: req.body.fname,
      lname: req.body.lname,
      role: req.body.role,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
