const Animal = require("../models/animal");
const Car = require("../models/car");
const Telephone = require("../models/telephone");
const Book = require("../models/book");

/**
 * Vytváří nové pole, které je stejné jako původní, ale všechny objekty mají nový atribut "category"
 * @param {*} arr pole záznamů z DB
 * @param {*} category kategorie, která se přidá do každého záznamu
 * @returns Pole s novým atributem "category"
 */
const mutate = (arr, category) => {
  return arr.map((item) => {
    item = item.toObject();
    item.category = category;
    return item;
  });
};

/**
 * Získá všechny záznamy z DB a vrátí je v poli seřazeném podle data vytvoření
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getAllSorted = async (req, res) => {
  try {
    let animals = await Animal.find().select("-__v");
    let cars = await Car.find().select("-__v");
    let telephones = await Telephone.find().select("-__v");
    let books = await Book.find().select("-__v");

    animals = mutate(animals, "animal");
    cars = mutate(cars, "car");
    telephones = mutate(telephones, "telephone");
    books = mutate(books, "book");

    const all = [...animals, ...cars, ...telephones, ...books];
    console.log(all);
    const sorted = [...all].sort((a, b) => a.createdAt - b.createdAt);

    res.status(200).json({
      message: "All",
      count: sorted.length,
      all: sorted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Získá všechny záznamy z DB a je v různých polích podle kategorie
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getAllCategories = async (req, res) => {
  try {
    let animals = await Animal.find().select("-__v");
    let cars = await Car.find().select("-__v");
    let telephones = await Telephone.find().select("-__v");
    let books = await Book.find().select("-__v");

    animals = mutate(animals, "animal");
    cars = mutate(cars, "car");
    telephones = mutate(telephones, "telephone");
    books = mutate(books, "book");

    animals.forEach((animal) => (animal.category = "animal"));
    cars.forEach((car) => (car.category = "car"));
    telephones.forEach((telephone) => (telephone.category = "telephone"));
    books.forEach((book) => (book.category = "book"));

    animals.count = animals.length;
    cars.count = cars.length;
    telephones.count = telephones.length;
    books.count = books.length;
    const count = animals.count + cars.count + telephones.count + books.count;

    res.status(200).json({
      message: "All",
      count,
      animals,
      cars,
      telephones,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
