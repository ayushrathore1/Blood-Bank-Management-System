const express = require("express");
const {
  createDonor,
  myDonorProfile,
  getDonors,
  updateDonor,
} = require("../controllers/donorController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, createDonor);
router.get("/me", protect, myDonorProfile);
router.get("/", getDonors);
router.put("/me", protect, updateDonor);

module.exports = router;
