const express = require("express");
const router = express.Router();
const { fetchActiveContest } = require("../controllers/Contest");

router.get("/active", fetchActiveContest);

module.exports = router;
