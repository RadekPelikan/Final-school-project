const express = require("express");
const router = express.Router();
const animalsController = require("../controllers/animals");

/**
 * URL: /animals
 * Získá všechny záznamy zvířat z DB
 */
router.get("/", animalsController.getAllAnimals);
/**
 * URL: /animals/info
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 */
router.get("/info", animalsController.getInfo)
/**
 * URL: /animals/:id
 * Získá zvíře podle ID (identifikační číslo)
 */
router.get("/:id", animalsController.getAnimalById);

/**
 * URL: /animals
 * Vytvoří nový záznam zvířete v DB
 * 
 * zvíře je v těle požadavku
 * body: {
 * name,
 * type,
 * color,
 * legs,
 * description
 */
router.post("/", animalsController.createAnimal);

// router.put("/:id", animalsController.updateAnimal);

/**
 * URL: /animals
 * Smaže všechny záznamy zvířat z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 */
router.delete("/", animalsController.deleteAllAnimals);
/**
 * URL: /animals/:id
 * Smaže záznam zvířete z DB podle ID (identifikační číslo)
 */
router.delete("/:id", animalsController.deleteAnimal);

module.exports = router;
