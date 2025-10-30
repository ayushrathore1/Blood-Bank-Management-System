const express = require("express");
const {
  createRequest,
  myRequests,
  getAllRequests,
  updateRequest,
} = require("../controllers/requestController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, createRequest);
router.get("/my", protect, myRequests);
router.get("/", protect, getAllRequests); // only allow admin/hospital roles with extra middleware if needed
router.put("/:id", protect, updateRequest);

module.exports = router;
