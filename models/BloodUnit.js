const mongoose = require("mongoose");

const bloodUnitSchema = new mongoose.Schema(
  {
    unitId: { type: String, required: true, unique: true },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    collectionDate: { type: Date, required: true, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["available", "reserved", "used", "expired", "discarded"],
      default: "available",
    },
    volume: { type: Number, required: true, min: 200, max: 500, default: 450 },
    collectionSite: { type: String, required: true },
    collectionStaff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    testResults: {
      hiv: {
        type: String,
        enum: ["negative", "positive", "pending"],
        default: "pending",
      },
      hepatitisB: {
        type: String,
        enum: ["negative", "positive", "pending"],
        default: "pending",
      },
      hepatitisC: {
        type: String,
        enum: ["negative", "positive", "pending"],
        default: "pending",
      },
      syphilis: {
        type: String,
        enum: ["negative", "positive", "pending"],
        default: "pending",
      },
    },
    testedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    testedDate: Date,
    location: {
      storage: String,
      shelf: String,
      position: String,
    },
    notes: String,
  },
  { timestamps: true }
);

// Utility methods
bloodUnitSchema.methods.isExpired = function () {
  return new Date() > this.expiryDate;
};

bloodUnitSchema.methods.isAvailable = function () {
  return this.status === "available" && !this.isExpired();
};

bloodUnitSchema.statics.getAvailableByType = function (bloodType) {
  return this.find({
    bloodType,
    status: "available",
    expiryDate: { $gt: new Date() },
  });
};

module.exports = mongoose.model("BloodUnit", bloodUnitSchema);
