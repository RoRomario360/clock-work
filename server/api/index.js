import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {
  deleteTimeInterval,
  getIntervals,
  saveTimeInterval,
} from "../controllers/TimeController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/validation.js";
import {
  getAllUsers,
  getMe,
  login,
  register,
} from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";

const app = express();

//MIDDLEWARES
dotenv.config();
app.use(express.json());
app.use(cors());

//ROUTES

//versel test
app.get("/api", (req, res) => {
  res.send(`<h5 style="color:green">
        Hey Geek! you just deployed serverless express api</h5>`);
});

// register user
app.post(
  "/api/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
// //login user
app.post("/api/auth/login", loginValidation, handleValidationErrors, login);
// //get user info
app.get("/api/auth/me", checkAuth, getMe);
// //add time interval for a user
app.post("/api/users/:userId/time-intervals", saveTimeInterval);
// //delete time intervals
app.delete("/api/users/:userId/time-intervals", deleteTimeInterval);
// //get the total time of a user
app.get("/api/users/:userId/time-intervals", getIntervals);
// //get all users
app.get("/api/users", getAllUsers);

//CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server OK");
});

export default app;
