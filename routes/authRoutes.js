const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validateRegister } = require("../middleware/validator");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;
