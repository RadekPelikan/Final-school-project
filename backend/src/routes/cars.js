const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars");

/**
 * URL: /cars
 * Získá všechny záznamy aut z DB
 */
router.get("/", carsController.getAllCars);
/**
 * URL: /cars/info
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 */
router.get("/info", carsController.getInfo);
/**
 * URL: /cars/:id
 * Získá auto podle ID (identifikační číslo)
 */
router.get("/:id", carsController.getCarById);

/**
 * URL: /cars¨
 * Vytvoří nový záznam auta v DB
 * 
 * auto je v těle požadavku
 * body: {
 * name,
 * engineType,
 * transimissionType,
 * brand,
 * color
 * }
 */
router.post("/", carsController.createCar);

// router.put("/:id", carsController.updateCar);

/**
 * URL: /cars
 * Smaže všechny záznamy aut z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 */
router.delete("/", carsController.deleteAllCars);
/**
 * URL: /cars/:id
 * Smaže záznam auta z DB podle ID (identifikační číslo)
 */
router.delete("/:id", carsController.deleteCar);

module.exports = router;
