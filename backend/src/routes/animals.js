const express = require("express");
const router = express.Router();
const animalsController = require("../controllers/animal");

router.get("/", animalsController.getAllAnimals);
router.get("/:id", animalsController.getAnimalById);

router.post("/", animalsController.createAnimal);

// router.put("/:id", animalsController.updateAnimal);

router.delete("/:id", animalsController.deleteAnimal);
router.delete("/", animalsController.deleteAllAnimals);

module.exports = router;