import { Router } from "express";
import { sid } from "../controllers/organizationsController";
import { verifyUserJWT } from "../middlewares/authMiddleware";
import { getAllOrganizations } from "../controllers/organizationsController";

const router = Router();

router.get("/", verifyUserJWT, getAllOrganizations);

router.post("/sid", sid);



export default router;
