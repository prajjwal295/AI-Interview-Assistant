const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const Port = process.env.Port || 4000;

const database = require("./config/database");
database.dbConnect();

const corsOptions = {
  origin: ["http://localhost:3000", "https://form-submission-tau.vercel.app"],
  credentials: true,
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const interviewRoutes = require("./routes/Interview");

app.use("/api/interviews", interviewRoutes);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

// activate server
app
  .listen(Port, () => {
    console.log(`app listens at ${Port}`);
  })
  .on("error", (err) => {
    console.error("Server start error:", err);
  });
