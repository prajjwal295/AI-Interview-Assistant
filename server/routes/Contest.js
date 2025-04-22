const express = require("express");
const router = express.Router();
const {
  fetchActiveContest,
  fetchPastContest,
} = require("../controllers/Contest");

router.get("/active", fetchActiveContest);
router.get("/closed", fetchPastContest);

module.exports = router;
