const Telephone = require("../models/telephone");
const { ObjectId } = require("mongoose").Types;


/**
 * Získá všechny záznamy telefonů z DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getAllTelephones = async (req, res) => {
  try {
    const telephones = await Telephone.find().select("-__v");
    if (!telephones)
      return res.status(404).json({ message: "No telephones found" });
    res
      .status(200)
      .json({
        message: "All telephones",
        count: telephones.length,
        telephones,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Získá klíče, které jsou potřeba pro dynamické vytváření formulářů
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getInfo = (req, res) => {
  const keys = Object.keys(Telephone.schema.paths);
  keys.splice(keys.length - 3)
  res.status(200).json({ message: "Info", keys });
};

/**
 * Získá telefón podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.getTelephoneById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No telephone found" });

    const telephone = await Telephone.findById(id).select("-__v");
    if (!telephone)
      return res.status(404).json({ message: "No telephone found" });
    res.status(200).json({ message: "Telephone found", telephone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Vytvoří nový záznam telefonu v DB
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.createTelephone = async (req, res) => {
  try {
    const telephone = new Telephone(req.body);
    await telephone.save();
    telephone.__v = undefined;
    res.status(201).json({ message: "Telephone created", telephone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateTelephone = (req, res) => {};

/**
 * Smaže všechny záznamy telefonů z DB
 * 
 * Je potřeba předat parametr "iamonehunderedpercentsure" s hodnotou "true"
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteAllTelephones = async (req, res) => {
  try {
    if (!req.query.iamonehunderedpercentsure)
      return res.status(403).json({ message: "You are not sure enough" });

    Telephone.deleteMany({}, (err) => {
      if (err) return res.status(500).json({ message: "Something went wrong" });
      res.status(200).json({ message: "All telephones deleted" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Smaže záznam telefonu podle ID (identifikační číslo)
 * @param {*} req Express request
 * @param {*} res Express response
 */
exports.deleteTelephone = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).json({ message: "No telephone found" });

      const telephone = await Telephone.findByIdAndDelete(id).select("-__v");
      if (!telephone) return res.status(404).json({ message: "No telephone found" });
      res.status(200).json({ message: "Telephone deleted", telephone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
