const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

require("./models/User");
require("./models/Donor");
require("./models/BloodUnit");
require("./models/Hospital");
require("./models/Request");



const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/blood", require("./routes/bloodRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: "BBMS API running",
      timestamp: new Date().toISOString(),
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Server Error", error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
