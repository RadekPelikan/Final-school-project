const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

/**
 * URL: /books
 * Získá všechny záznamy knih z DB
 */
router.get("/", booksController.getAllBooks);
/**
 * URL: /books/info
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 */
router.get("/info", booksController.getInfo)
/**
 * URL: /books/:id
 * Získá knihu podle ID (identifikační číslo)
 */
router.get("/:id", booksController.getBookById);

/**
 * URL: /books
 * Vytvoří nový záznam knihy v DB
 * 
 * kniha je v těle požadavku
 * body: {
 * title,
 * author,
 * pages,
 * genre,
 * year
 * }
 */
router.post("/", booksController.createBook);

// router.put("/:id", booksController.updateBook);

/**
 * URL: /books
 * Smaže všechny záznamy knih z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 */
router.delete("/:id", booksController.deleteBook);
/**
 * URL: /books/:id
 * Smaže záznam knihy z DB podle ID (identifikační číslo)
 */
router.delete("/", booksController.deleteAllBooks);

module.exports = router;
