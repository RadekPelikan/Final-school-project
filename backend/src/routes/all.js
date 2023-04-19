const express = require("express");
const router = express.Router();
const allController = require("../controllers/all");

/**
 * URL: /all 
 * Získá všechny záznamy z DB a vrátí je v poli seřazeném podle data vytvoření
 */
router.get("/", allController.getAllSorted);
/**
 * URL: /all/sorted
 * Získá všechny záznamy z DB a vrátí je v poli seřazeném podle data vytvoření
 */
router.get("/sorted", allController.getAllSorted);
/**
 * URL: /all/categories\
 * Získá všechny záznamy z DB a je v různých polích podle kategorie
 */
router.get("/categories", allController.getAllCategories);


module.exports = router;