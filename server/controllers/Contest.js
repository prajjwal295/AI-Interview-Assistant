const Contest = require("../models/Contest");

const fetchActiveContest = async (req, res) => {
  try {
    const contest = await Contest.findOne({
      status: "active",
    });
    console.log(contest);
    if (contest != null) {
      res.status(200).json({
        success: true,
        message: "Contest fetched successfully!",
        data: contest,
      });
    }
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch interviews.",
    });
  }
};

module.exports = {
  fetchActiveContest,
};
