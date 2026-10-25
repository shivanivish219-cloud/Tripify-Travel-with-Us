const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["domestic", "international"],
      required: true,
    },

    category: {
      type: String,
      enum: ["hill", "beach", "adventure", "heritage"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    // === YE 3 FIELD NAYE HAIN - SEARCH KE LIYE ===
    hindiName: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
      index: true, // search fast hoga
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Search index for fuzzy + multilingual
destinationSchema.index({
  name: "text",
  hindiName: "text",
  keywords: "text",
  tags: "text",
});

module.exports = mongoose.model("Destination", destinationSchema);
