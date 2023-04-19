const Animal = require("../models/animal");
const { ObjectId } = require("mongoose").Types;

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().select("-__v");
    if (!animals) return res.status(404).json({ message: "No animals found" });
    res
      .status(200)
      .json({ message: "All animals", count: animals.length, animals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getInfo = (req, res) => {
  const keys = Object.keys(Animal.schema.paths);
  keys.splice(keys.length - 3)
  res.status(200).json({ message: "Info", keys });
};


exports.getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No animal found" });

    const animal = await Animal.findById(id).select("-__v");
    if (!animal) return res.status(404).json({ message: "No animal found" });
    res.status(200).json({ message: "Animal found", animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    animal.__v = undefined;
    res.status(201).json({ message: "Animal created", animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateAnimal = (req, res) => {};

exports.deleteAllAnimals = async (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure)
      return res.status(403).json({ message: "You are not sure enough" });

    const count = await Animal.countDocuments();
    await Animal.deleteMany({}, (err) => {
      if (err) return res.status(500).json({ message: "Something went wrong" });
      res.status(200).json({ message: "All animals deleted", count });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No animal found" });

    const animal = await Animal.findByIdAndDelete(id).select("-__v");
    if (!animal) return res.status(404).json({ message: "No animal found" });
    res.status(200).json({ message: "Animal deleted", animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
