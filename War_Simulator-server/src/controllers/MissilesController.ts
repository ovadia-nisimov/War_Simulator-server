import { Request, Response } from "express";
import { initDatabase } from "../services/MissilesService";

export const sid = async (req: Request, res: Response) => {
  try {
    await initDatabase();
    res.status(201).json({ message: "success" });
  } catch (erorr) {
    res.status(400).json({ message: (erorr as Error).message })  }
  
};
