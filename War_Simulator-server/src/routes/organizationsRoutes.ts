import { Router } from "express";
import { sid } from "../controllers/organizationsController";
// import { verifyUserJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/sid", sid);


export default router;
