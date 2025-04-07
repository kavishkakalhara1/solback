import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import ticketRoutes from "./routes/ticket.route.js";
import issueRoutes from "./routes/issue.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express(); // Initialize the app here

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000', 'https://solveitsl.site', 'https://13.61.21.9'], // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Ticket Server is running on port 3000!");
});

app.use("/api/ticketService/", ticketRoutes);
app.use("/api/issueService/", issueRoutes);
app.use("/api/userService/user", userRoutes);
app.use("/api/userService/auth", authRoutes);

app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});