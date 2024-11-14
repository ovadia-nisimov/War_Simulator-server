import express from "express";
import { getUserAttacks, launchAttack } from "../controllers/attackController";
import { verifyUserJWT } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/launch", verifyUserJWT, launchAttack);
router.get("/user-attacks", verifyUserJWT, getUserAttacks);

export default router;