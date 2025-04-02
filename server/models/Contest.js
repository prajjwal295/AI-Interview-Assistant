const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
  jobPosition: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  DateOfContest: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "ended"],
    default: "active",
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  enrollments: [
    {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email format",
      },
    },
  ],
});

module.exports = mongoose.model("Contest", ContestSchema);
