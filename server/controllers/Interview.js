const Interview = require("../models/MockInterview");
const Contest = require("../models/Contest");
const AiResponse = require("../models/AiResponse");

const createInterview = async (req, res) => {
  try {
    const {
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
      contestId,
    } = req.body.formData;

    if (
      !jsonMockResp ||
      !jobPosition ||
      !jobDescription ||
      !jobExperience ||
      !createdBy
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: jsonMockResp, jobPosition, jobDescription, jobExperience, createdBy.",
      });
    }

    if (contestId) {
      const contest = await Contest.findById(contestId);

      if (!contest) {
        return res.status(404).json({
          success: false,
          message: "Contest not found.",
        });
      }

      const isEnrolled = contest.enrollments.some((x) => x === createdBy);

      if (isEnrolled) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in the contest.",
        });
      }
    }

    const interview = new Interview({
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
      contestId: contestId || null,
    });

    await interview.save();

    if (contestId) {
      await Contest.findByIdAndUpdate(
        contestId,
        { $push: { enrollments: createdBy } },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: "Interview created successfully!",
      data: interview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not create the interview.",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { answers, id } = req.body;

    if (!id || !answers) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const interviewRecord = await Interview.findOneAndUpdate(
      { mockId: id },
      { userAnswers: answers },
      { new: true }
    ).exec();

    if (!interviewRecord) {
      return res.status(404).json({ error: "Interview record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interviewRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const updateInterviewFeedback = async (req, res) => {
  try {
    const { questionFeedback, areasToImprove, overallPerformance, score, id } =
      req.body;

    if (
      !id ||
      !questionFeedback ||
      !areasToImprove ||
      !overallPerformance ||
      !score
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Find the interview by mockId
    const interview = await Interview.findOne({ mockId: id });

    if (!interview) {
      return res
        .status(404)
        .json({ success: false, error: "InterviewId is not valid" });
    }

    if (interview.aiFeedback != null) {
      return res
        .status(404)
        .json({ success: false, error: "Ai response is already present" });
    }

    // Save the AI response
    const aiResponse = new AiResponse({
      questionFeedback,
      areasToImprove,
      overallPerformance,
      score,
      interviewId: interview._id,
    });

    await aiResponse.save();

    await Interview.findOneAndUpdate(
      { mockId: id },
      { aiFeedback: aiResponse._id },
      { new: true }
    );

    const updatedInterview = await Interview.findOne({ mockId: id }).populate(
      "aiFeedback"
    );

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview: updatedInterview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

// Fetch All Interviews Controller
const fetchAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find(); // Fetch all documents
    res.status(200).json({
      success: true,
      message: "Interviews fetched successfully!",
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch interviews.",
    });
  }
};

const fetchInterviewDetailsById = async (req, res) => {
  try {
    const { mockId, createdBy } = req.query;

    if (!mockId || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "The 'mockId',createdBy parameter is required.",
      });
    }

    const interview = await Interview.findOne({ mockId }).populate(
      "aiFeedback"
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    if (interview.createdBy.toString() !== createdBy.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview details fetched successfully!",
      data: interview,
    });
  } catch (error) {
    console.error("Error fetching interview:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch interview.",
    });
  }
};

const fetchInterviewsByUser = async (req, res) => {
  try {
    const { createdBy } = req.query;

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "The 'createdBy' parameter is required.",
      });
    }

    const interviews = await Interview.find({
      createdBy,
      aiFeedback: null,
    });

    if (interviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No interviews found for the given 'createdBy' value.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interviews fetched successfully!",
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews by createdBy:", error);
    res.status(500).json({
      success: false,
      message:
        "Internal server error. Could not fetch interviews by createdBy.",
    });
  }
};

const fetchCompltedInterviewsByUser = async (req, res) => {
  try {
    const { createdBy } = req.query;
    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "The 'createdBy' parameter is required.",
      });
    }

    const interviews = await Interview.find({
      createdBy,
      aiFeedback: { $ne: null },
    });

    if (interviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No interviews found for the given user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interviews fetched successfully!",
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews by createdBy:", error);
    res.status(500).json({
      success: false,
      message:
        "Internal server error. Could not fetch interviews by createdBy.",
    });
  }
};

const deleteInteriewRecordByUser = async (req, res) => {
  try {
    const { createdBy, mockId } = req.body;

    if (!createdBy || !mockId) {
      return res.status(400).json({
        success: false,
        message: "Both 'createdBy' and 'mockId' are required.",
      });
    }

    const interview = await Interview.findOneAndDelete({ createdBy, mockId });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "No interview found for the given 'createdBy' and 'mockId'.",
      });
    }
    const updatedInterview = await Interview.find({
      createdBy,
      aiFeedback: null,
    });

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully!",
      data: updatedInterview,
    });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not delete the interview.",
    });
  }
};

const fetchLeaderBoardData = async (req, res) => {
  try {
    const { contestId } = req.query;
    if (!contestId) {
      return res.status(400).json({
        success: false,
        message: "The 'contestId' parameter is required.",
      });
    }

    const interviews = await Interview.find({
      contestId: contestId,
    }).populate("aiFeedback");

    console.log(interviews);

    if (interviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data found for the given Contest",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interviews fetched successfully!",
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews for leaderboard:", error);
    res.status(500).json({
      success: false,
      message:
        "Internal server error. Could not fetch interviews for leaderboard",
    });
  }
};

module.exports = {
  createInterview,
  fetchAllInterviews,
  fetchInterviewsByUser,
  updateInterview,
  fetchCompltedInterviewsByUser,
  updateInterviewFeedback,
  fetchLeaderBoardData,
  deleteInteriewRecordByUser,
  fetchInterviewDetailsById,
};
