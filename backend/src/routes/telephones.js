const express = require("express");
const router = express.Router();
const telephonesController = require("../controllers/telephones");

/**
 * URL: /telephones
 * Získá všechny záznamy telefonů z DB
 */
router.get("/", telephonesController.getAllTelephones);
/**
 * URL: /telephones/info
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 */
router.get("/info", telephonesController.getInfo)
/**
 * URL: /telephones/:id
 * Získá telefon podle ID (identifikační číslo)
 */
router.get("/:id", telephonesController.getTelephoneById);

/**
 * URL: /telephones
 * Vytvoří nový záznam telefonu v DB
 * 
 * telefon je v těle požadavku
 * body: {
 * name,
 * brand,
 * displayType,
 * storageSize,
 * ramSize,
 * color
 * }
 */
router.post("/", telephonesController.createTelephone);

// router.put("/:id", telephonesController.updateTelephone);

/**
 * URL: /telephones
 * Smaže všechny záznamy telefonů z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 */
router.delete("/:id", telephonesController.deleteTelephone);
/**
 * URL: /telephones/:id
 * Smaže záznam telefonu z DB podle ID (identifikační číslo)
 */
router.delete("/", telephonesController.deleteAllTelephones);

module.exports = router;
