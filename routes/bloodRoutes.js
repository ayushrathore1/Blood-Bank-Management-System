const express = require("express");
const {
  addBloodUnit,
  getAllBloodUnits,
  getBloodUnitsByType,
  updateBloodUnit,
} = require("../controllers/bloodController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, addBloodUnit);
router.get("/", getAllBloodUnits);
router.get("/type/:bloodType", getBloodUnitsByType);
router.put("/:id", protect, updateBloodUnit);

module.exports = router;
