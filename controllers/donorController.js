const Donor = require("../models/Donor");
const User = require("../models/User");

// @desc    Register donor profile
// @route   POST /api/donors
exports.createDonor = async (req, res) => {
  try {
    // Assume user is authenticated and req.user.id is available
    const data = { ...req.body, user: req.user.id };
    const donor = await Donor.create(data);
    res.status(201).json({ success: true, message: "Donor registered", donor });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not register donor",
        error: error.message,
      });
  }
};

// @desc    Get donor profile by user
// @route   GET /api/donors/me
exports.myDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user.id });
    if (!donor)
      return res
        .status(404)
        .json({ success: false, message: "Donor profile not found" });
    res.json({ success: true, donor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    List all donors
// @route   GET /api/donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("user", "name email contact");
    res.json({ success: true, donors });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Update donor
// @route   PUT /api/donors/me
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );
    if (!donor)
      return res
        .status(404)
        .json({ success: false, message: "Donor profile not found" });
    res.json({ success: true, donor });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update donor",
        error: error.message,
      });
  }
};
