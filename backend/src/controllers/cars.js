const Car = require("../models/car");
const { ObjectId } = require("mongoose").Types;

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

exports.deleteAllCars =async  (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure)
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

