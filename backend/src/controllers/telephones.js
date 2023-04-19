const Telephone = require("../models/telephone");
const { ObjectId } = require("mongoose").Types;

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
