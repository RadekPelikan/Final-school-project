const Car = require("../models/car");
const { ObjectId } = require("mongoose").Types;

/**
 * Získá všechny záznamy aut z DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().select("-__v");
    if (!cars) return res.status(404).json({ message: "No cars found" });
    res
      .status(200)
      .json({ message: "All cars", count: cars.length, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getInfo = (req, res) => {
  const keys = Object.keys(Car.schema.paths);
  keys.splice(keys.length - 3)
  res.status(200).json({ message: "Info", keys });
};

/**
 * Získá auto podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No car found" });

    const car = await Car.findById(id).select("-__v");
    if (!car) return res.status(404).json({ message: "No car found" });
    res.status(200).json({ message: "Car found", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Vytvoří nový záznam auta v DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    car.__v = undefined;
    res.status(201).json({ message: "Car created", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateCar = (req, res) => {};

/**
 * Smaže všechny záznamy aut z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteAllCars =async  (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure === "true")
      return res.status(403).json({ message: "You are not sure enough" });

    const count = await Car.countDocuments();
    await Car.deleteMany({}, (err) => {
      if (err) return res.status(500).json({ message: "Something went wrong" });
      res.status(200).json({ message: "All cars deleted", count });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Smaže záznam auta podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteCar = async(req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No car found" });

    const car = await Car.findByIdAndDelete(id).select("-__v");
    if (!car) return res.status(404).json({ message: "No car found" });
    res.status(200).json({ message: "Car deleted", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

