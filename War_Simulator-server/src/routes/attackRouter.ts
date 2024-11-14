// src/routes/attackRouter.ts

import express from "express";
import { getUserAttacks, launchAttack,getAttacksByRegion, updateAttackStatus } from "../controllers/attackController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/launch", authMiddleware, launchAttack);
router.get("/user-attacks", authMiddleware, getUserAttacks);
router.get("/region-attacks", authMiddleware, getAttacksByRegion);
router.post("/update-status", authMiddleware, updateAttackStatus);


export default router;