const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },

    // Traveler details (kept on the booking itself, not just pulled from
    // the User, since the person booking might differ from the account holder)
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    destination: { type: String, required: true },
    packageType: {
      type: String,
      enum: ["domestic", "international"],
      default: "domestic",
    },
    travelDate: { type: Date, required: true },
    returnDate: { type: Date },

    numberOfTravellers: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
    },

    specialRequests: { type: String, default: "" },

    amount: { type: Number, required: true },

    // "pending"   -> booking saved via "Confirm Booking (Pay Later)"
    // "paid"      -> booking saved after the PaymentPage flow completes
    // "cancelled" -> cancelled by user/admin
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", null],
      default: null,
    },
  },
  { timestamps: true },
);

function generateBookingReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TRP-${stamp}-${rand}`;
}

bookingSchema.pre("validate", function (next) {
  if (!this.bookingReference) {
    this.bookingReference = generateBookingReference();
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
