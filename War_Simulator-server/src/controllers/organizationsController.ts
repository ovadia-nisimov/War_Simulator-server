import { Request, Response } from "express";
import { getOrganizations, initDatabase } from "../services/organizationsService";


export const sid = async (req: Request, res: Response) => {
  try {
    await initDatabase();
    res.status(201).json({ message: "success" });
  } catch (erorr) {
    res.status(400).json({ message: (erorr as Error).message })  }
  
};

export const getAllOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await getOrganizations();
        res.status(201).json(organizations);
      } catch (erorr) {
        res.status(400).json({ message: (erorr as Error).message })  }
    };
