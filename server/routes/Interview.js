const express = require("express");
const router = express.Router();
const {
  createInterview,
  fetchAllInterviews,
  fetchInterviewsByUser,
  updateInterview,
  fetchCompltedInterviewsByUser,
  updateInterviewFeedback,
  fetchLeaderBoardData,
} = require("../controllers/Interview");

router.post("/create", createInterview);
router.get("/all", fetchAllInterviews);
router.get("/user", fetchInterviewsByUser);
router.get("/user/completed/:createdBy", fetchCompltedInterviewsByUser);
router.put("/update", updateInterview);
router.put("/updateFeedback", updateInterviewFeedback);
router.get("/LeaderBoardData", fetchLeaderBoardData);

module.exports = router;
