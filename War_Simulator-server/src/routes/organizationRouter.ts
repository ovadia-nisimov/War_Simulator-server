import express from "express";
import { getOrganizationNames } from "../controllers/organizationController";

const router = express.Router();

router.get("/names", getOrganizationNames);

export default router;