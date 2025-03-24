const Interview = require("../models/MockInterview");

const createInterview = async (req, res) => {
  console.log(req.body.formData);
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
  console.log(req);
  try {
    const { answers, id } = req.body;

    if (!id || !answers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interviewRecord = await Interview.findOneAndUpdate(
      { mockId: id },
      { UserAnswer: answers },
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

// Fetch Interviews by `createdBy` Controller
const fetchInterviewsByUser = async (req, res) => {
  try {
    const { createdBy } = req.params;

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "The 'createdBy' parameter is required.",
      });
    }

    const interviews = await Interview.find({ createdBy }); // Fetch documents by createdBy

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

module.exports = {
  createInterview,
  fetchAllInterviews,
  fetchInterviewsByUser,
  updateInterview,
};
