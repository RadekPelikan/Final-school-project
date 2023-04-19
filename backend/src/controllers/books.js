const Book = require("../models/book");
const { ObjectId } = require("mongoose").Types;

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

exports.deleteAllBooks = async (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure)
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
