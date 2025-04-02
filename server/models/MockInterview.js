const { randomUUID } = require("crypto");
const mongoose = require("mongoose");

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
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
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userAnswers: {
    type: mongoose.Schema.Types.Mixed,
    default: [],
  },
  mockId: {
    type: String,
    required: true,
    default: randomUUID,
  },
  aiFeedback: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
    default: null,
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
    default: null,
  },
});

module.exports = mongoose.model("Interview", mockInterviewSchema);
