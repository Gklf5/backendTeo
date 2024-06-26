import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import authRoute from "./routes/authentication.js";
import youtubeRoute from "./routes/youtube.js";
import cookieParser from "cookie-parser";
import projectRoute from "./routes/project.js";
import notificationRoute from "./routes/notification.js";

const app = express();
dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connectedto db");
    })
    .catch((err) => {
      throw err;
    });
};
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/youtube", youtubeRoute);
app.use("/api/project", projectRoute);
app.use("/api/notification", notificationRoute);
app.get("/callback", (req, res) => {
  console.log(req.query);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8000, () => {
  connect();
  console.log("connected");
});
