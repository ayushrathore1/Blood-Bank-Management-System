const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    medicalHistory: {
      hasDiabetes: { type: Boolean, default: false },
      hasHypertension: { type: Boolean, default: false },
      hasHeartDisease: { type: Boolean, default: false },
      hasCancer: { type: Boolean, default: false },
      hasHIV: { type: Boolean, default: false },
      hasHepatitis: { type: Boolean, default: false },
      otherConditions: String,
    },
    lastDonationDate: Date,
    totalDonations: { type: Number, default: 0 },
    isEligible: { type: Boolean, default: true },
    eligibilityReason: String,
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Calculate age virtual
donorSchema.virtual("age").get(function () {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return age;
  }
  return null;
});

// Eligibility check
donorSchema.methods.canDonate = function () {
  const today = new Date();
  const age = this.age;
  if (age < 18 || age > 65)
    return { eligible: false, reason: "Age not within donation range 18-65" };
  if (this.lastDonationDate) {
    const daysSinceLastDonation = Math.floor(
      (today - this.lastDonationDate) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastDonation < 56)
      return { eligible: false, reason: "Must wait 56 days between donations" };
  }
  if (this.medicalHistory.hasHIV || this.medicalHistory.hasHepatitis)
    return { eligible: false, reason: "Medical condition prevents donation" };
  if (!this.isEligible)
    return { eligible: false, reason: this.eligibilityReason };
  return { eligible: true };
};

module.exports = mongoose.model("Donor", donorSchema);
