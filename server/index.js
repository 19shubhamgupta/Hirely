const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRouter");
const ConnectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const roadmapRouter = require("./routes/roadmapRouter");
const resumeRouter = require("./routes/resumeRouter");
const interviewRouter = require("./routes/interviewRouter");
const reportRouter = require("./routes/reportRouter");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/reports", reportRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
  ConnectDB();
});
