import { Router } from "express";
import { sid } from "../controllers/organizationsController";
import { getAllOrganizations } from "../controllers/organizationsController";

const router = Router();

router.get("/", getAllOrganizations);

router.post("/sid", sid);



export default router;
