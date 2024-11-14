// src/routes/attackRouter.ts

import express from "express";
import { getUserAttacks, launchAttack } from "../controllers/attackController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/launch", authMiddleware, launchAttack);
router.get("/user-attacks", authMiddleware, getUserAttacks);

export default router;