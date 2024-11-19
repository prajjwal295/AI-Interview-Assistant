const express = require("express");
const router = express.Router();
const {
  createInterview,
  fetchAllInterviews,
  fetchInterviewsByUser,
} = require("../controllers/Interview");

// Create an interview
router.post("/create", createInterview);

// Fetch all interviews
router.get("/all", fetchAllInterviews);

// Fetch interviews by createdBy
router.get("/user/:createdBy", fetchInterviewsByUser);

module.exports = router;
