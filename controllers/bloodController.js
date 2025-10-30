const BloodUnit = require("../models/BloodUnit");
const Donor = require("../models/Donor");
const generateId = require("../utils/generateId");

// @desc    Add blood unit (admin/hospital)
// @route   POST /api/blood
exports.addBloodUnit = async (req, res) => {
  try {
    const { donor, bloodType, expiryDate, volume, collectionSite } = req.body;
    const unitId = generateId("BU");
    const bloodUnit = await BloodUnit.create({
      unitId,
      donor,
      bloodType,
      expiryDate,
      volume,
      collectionSite,
    });
    res.status(201).json({ success: true, bloodUnit });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not add blood unit",
        error: error.message,
      });
  }
};

// @desc    Get all available blood units
// @route   GET /api/blood
exports.getAllBloodUnits = async (req, res) => {
  try {
    const units = await BloodUnit.find({
      status: "available",
      expiryDate: { $gt: new Date() },
    });
    res.json({ success: true, units });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get blood units by type
// @route   GET /api/blood/type/:bloodType
exports.getBloodUnitsByType = async (req, res) => {
  try {
    const { bloodType } = req.params;
    const units = await BloodUnit.find({
      bloodType,
      status: "available",
      expiryDate: { $gt: new Date() },
    });
    res.json({ success: true, units });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not find blood units",
        error: error.message,
      });
  }
};

// @desc    Update blood unit status (used/expired/etc.)
// @route   PUT /api/blood/:id
exports.updateBloodUnit = async (req, res) => {
  try {
    const unit = await BloodUnit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!unit)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, unit });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update blood unit",
        error: error.message,
      });
  }
};
