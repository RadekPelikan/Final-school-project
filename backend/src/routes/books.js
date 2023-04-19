const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);
router.get("/info", booksController.getInfo)
router.get("/:id", booksController.getBookById);

router.post("/", booksController.createBook);

// router.put("/:id", booksController.updateBook);

router.delete("/:id", booksController.deleteBook);
router.delete("/", booksController.deleteAllBooks);

module.exports = router;
