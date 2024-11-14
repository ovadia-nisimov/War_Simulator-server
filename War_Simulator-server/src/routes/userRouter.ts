// src/routes/userRouter.ts

import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import User from "../models/userModel";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);


export default router;