const Interview = require("../models/MockInterview");

const createInterview = async (req, res) => {
  try {
    const {
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
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

    // Create a new Interview document
    const interview = new Interview({
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
    });

    await interview.save();

    console.log(interview);

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
  console.log(req.body);
  try {
    const { answers, id } = req.body;

    if (!id || !answers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interviewRecord = await Interview.findOneAndUpdate(
      { mockId: id },
      { userAnswers: answers },
      { new: true }
    ).exec();

    console.log(interviewRecord);

    if (!interviewRecord) {
      return res.status(404).json({ error: "Interview record not found" });
    }

    res
      .status(200)
      .json({ message: "Interview updated successfully", interviewRecord });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateInterviewFeedback = async (req, res) => {
  try {
    const { feedback, id } = req.body;

    if (!id || !feedback) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interviewRecord = await Interview.findOneAndUpdate(
      { mockId: id },
      { aiFeedback: feedback },
      { new: true }
    ).exec();

    if (!interviewRecord) {
      return res.status(404).json({ error: "Interview record not found" });
    }

    res
      .status(200)
      .json({ message: "Interview updated successfully", interviewRecord });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
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
    const { mockId } = req.query;
    if (!mockId) {
      return res.status(400).json({
        success: false,
        message: "The 'mockId' parameter is required.",
      });
    }
    console.log(mockId);
    const interview = await Interview.findOne({ mockId: mockId });
    res.status(200).json({
      success: true,
      message: "Interview Details fetched successfully!",
      data: interview,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
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

    const interviews = await Interview.find({ createdBy });

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

module.exports = {
  createInterview,
  fetchAllInterviews,
  fetchInterviewsByUser,
  updateInterview,
  fetchCompltedInterviewsByUser,
  updateInterviewFeedback,
  fetchInterviewDetailsById,
};
