const Animal = require("../models/animal");
const Car = require("../models/car");
const Telephone = require("../models/telephone");
const Book = require("../models/book");

exports.getAllSorted = async (req, res) => {
  try {
    const animals = await Animal.find().select("-__v");
    const cars = await Car.find().select("-__v");
    const telephones = await Telephone.find().select("-__v");
    const books = await Book.find().select("-__v");

    const all = [...animals, ...cars, ...telephones, ...books];
    const sorted = [...all].sort((a, b) => a.createdAt - b.createdAt);

    res.status(200).json({
      message: "All",
      count: sorted.length,
      sorted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const animals = await Animal.find().select("-__v");
    const cars = await Car.find().select("-__v");
    const telephones = await Telephone.find().select("-__v");
    const books = await Book.find().select("-__v");

    animals.count = animals.length;
    cars.count = cars.length;
    telephones.count = telephones.length;
    books.count = books.length;
  
    res.status(200).json({
      message: "All",
      animals,
      cars,
      telephones,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}