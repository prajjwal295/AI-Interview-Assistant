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
  fetchInterviewDetailsById,
  deleteInteriewRecordByUser,
} = require("../controllers/Interview");

router.post("/create", createInterview);
router.get("/all", fetchAllInterviews);
router.get("/fetchById", fetchInterviewDetailsById);
router.get("/user", fetchInterviewsByUser);
router.delete("/user", deleteInteriewRecordByUser);
router.get("/user/completed", fetchCompltedInterviewsByUser);
router.put("/update", updateInterview);
router.put("/updateFeedback", updateInterviewFeedback);
router.get("/LeaderBoardData", fetchLeaderBoardData);

module.exports = router;
