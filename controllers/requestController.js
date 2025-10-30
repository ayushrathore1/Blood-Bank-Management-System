const Request = require("../models/Request");
const generateId = require("../utils/generateId");
const BloodUnit = require("../models/BloodUnit");

// @desc    Create a new blood request (hospital)
// @route   POST /api/requests
exports.createRequest = async (req, res) => {
  try {
    const { hospital, patientDetails, bloodUnits, requiredDate } = req.body;
    const requestId = generateId("REQ");
    const request = await Request.create({
      requestId,
      hospital,
      requestedBy: req.user.id,
      patientDetails,
      bloodUnits,
      requiredDate,
    });
    res.status(201).json({ success: true, request });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not create request",
        error: error.message,
      });
  }
};

// @desc    Get requests for the current user (hospital or donor)
// @route   GET /api/requests/my
exports.myRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requestedBy: req.user.id }).populate(
      "hospital"
    );
    res.json({ success: true, requests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get all requests (admin)
// @route   GET /api/requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("hospital")
      .populate("bloodUnits.unit");
    res.json({ success: true, requests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Update request status (approve/fulfill/etc.)
// @route   PUT /api/requests/:id
exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!request)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    res.json({ success: true, request });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Could not update request",
        error: error.message,
      });
  }
};
