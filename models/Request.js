const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, unique: true },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientDetails: {
      name: { type: String, required: true, trim: true },
      age: { type: Number, required: true },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      bloodType: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      medicalRecordNumber: String,
      diagnosis: String,
      urgency: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
      },
    },
    bloodUnits: [
      {
        bloodType: {
          type: String,
          required: true,
          enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        quantity: { type: Number, required: true, min: 1 },
        unit: { type: mongoose.Schema.Types.ObjectId, ref: "BloodUnit" },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "fulfilled", "cancelled"],
      default: "pending",
    },
    priority: { type: Number, default: 0 },
    requestedDate: { type: Date, default: Date.now },
    requiredDate: { type: Date, required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedDate: Date,
    rejectionReason: String,
    fulfillmentDate: Date,
    notes: String,
    trackingInfo: {
      dispatchedDate: Date,
      receivedDate: Date,
      trackingNumber: String,
    },
  },
  { timestamps: true }
);

requestSchema.methods.isUrgent = function () {
  const today = new Date();
  const requiredDate = new Date(this.requiredDate);
  const daysUntilRequired = Math.ceil(
    (requiredDate - today) / (1000 * 60 * 60 * 24)
  );
  return (
    this.patientDetails.urgency === "critical" ||
    (this.patientDetails.urgency === "high" && daysUntilRequired <= 1)
  );
};
module.exports = mongoose.model("Request", requestSchema);
