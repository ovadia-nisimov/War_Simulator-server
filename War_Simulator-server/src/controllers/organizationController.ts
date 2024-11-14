import { Request, Response } from "express";
import { fetchOrganizationNames } from "../services/organizationsService";

export const getOrganizationNames = async (req: Request, res: Response) => {
  try {
    const organizationNames = await fetchOrganizationNames();
    res.status(200).json(organizationNames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};