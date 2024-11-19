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
  mockId: {
    type: String,
    required: true,
    default: randomUUID,
  },
});

module.exports = mongoose.model("Interview", mockInterviewSchema);
