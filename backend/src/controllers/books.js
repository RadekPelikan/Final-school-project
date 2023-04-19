const Book = require("../models/book");
const { ObjectId } = require("mongoose").Types;


/**
 * Získá všechny záznamy knih z DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    if (!books) return res.status(404).json({ message: "No books found" });
    res.status(200).json({ message: "All books", count: books.length, books });
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
  const keys = Object.keys(Book.schema.paths);
  keys.splice(keys.length - 3)
  res.status(200).json({ message: "Info", keys });
};

/**
 * Získá knihu podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No book found" });

    const book = await Book.findById(id).select("-__v");
    if (!book) return res.status(404).json({ message: "No book found" });
    res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Vytvoří nový záznam knihy v DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    book.__v = undefined;
    res.status(201).json({ message: "Book created", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateBook = (req, res) => {};

/**
 * Smaže všechny záznamy knih z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteAllBooks = async (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure === "true")
      return res.status(403).json({ message: "You are not sure enough" });

    Book.deleteMany({}, (err) => {
      if (err) return res.status(500).json({ message: "Something went wrong" });
      res.status(200).json({ message: "All books deleted" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Smaže záznam knihy podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No book found" });

      const book = await Book.findByIdAndDelete(id).select("-__v");
      if (!book) return res.status(404).json({ message: "No book found" });
      res.status(200).json({ message: "Book deleted", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
