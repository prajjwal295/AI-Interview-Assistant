const cron = require("node-cron");
const Contest = require("../models/Contest");

const Topics = [
  "ReactJs",
  "Machine Learning",
  "Dot Net Core",
  "Java Backend",
  "NodeJs",
  "OOPS",
  "Software Engineering",
];

const difficulty = ["Easy", "Medium", "Hard"];

const getTopicOfTheDay = () => {
  const dayIndex = new Date().getDay();
  return Topics[dayIndex];
};

const getJobExperience = () => {
  var idx = Math.floor(Math.random() * 3);
  var d = difficulty[idx];

  let jobExperience = "";

  if (idx === 0) {
    jobExperience = "0-2 years";
  } else if (idx === 1) {
    jobExperience = "3-5 years";
  } else {
    jobExperience = "5+ years";
  }

  return { difficulty: d, jobExperience };
};

const initiateInterview = async () => {
  try {
    const jobPosition = getTopicOfTheDay();
    const { difficulty, jobExperience } = getJobExperience();
    const jobDescription = getTopicOfTheDay();

    const DateOfContest = new Date();

    const newContest = new Contest({
      jobPosition,
      jobDescription,
      jobExperience,
      DateOfContest,
      status: "active",
      difficulty,
      enrollments: [],
    });

    await newContest.save();
    console.log(
      `New interview initiated for ${jobPosition} at ${new Date().toISOString()}`
    );
  } catch (error) {
    console.error("Error initiating interview:", error);
  }
};

const closePreviousContests = async () => {
  try {
    const result = await Contest.updateMany(
      { status: "active" },
      { status: "ended" }
    );
    console.log(`${result.modifiedCount} previous contests ended.`);
  } catch (error) {
    console.error("Error closing previous contests:", error);
  }
};

const scheduleInterviewJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running the interview initiation cron job...");
    await closePreviousContests();
    await initiateInterview();
  });

  console.log("Cron job scheduled to run at 12:00 AM daily.");
};

module.exports = scheduleInterviewJob;
