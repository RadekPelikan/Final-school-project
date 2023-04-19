const express = require("express");
const router = express.Router();
const telephonesController = require("../controllers/telephones");

router.get("/", telephonesController.getAllTelephones);
router.get("/:id", telephonesController.getTelephoneById);

router.post("/", telephonesController.createTelephone);

// router.put("/:id", telephonesController.updateTelephone);

router.delete("/:id", telephonesController.deleteTelephone);
router.delete("/", telephonesController.deleteAllTelephones);

module.exports = router;