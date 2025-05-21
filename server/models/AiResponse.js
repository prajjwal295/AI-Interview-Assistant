const mongoose = require("mongoose");

const AiResponseSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  questionFeedback: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
  areasToImprove: [
    {
      type: String,
      required: true,
    },
  ],
  overallPerformance: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("AiResponse", AiResponseSchema);
