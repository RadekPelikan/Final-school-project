const express = require("express");
const router = express.Router();
const allController = require("../controllers/all");

router.get("/", allController.getAllSorted);
router.get("/sorted", allController.getAllSorted);
router.get("/categories", allController.getAllCategories);


module.exports = router;