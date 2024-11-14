// src/controllers/userController.ts

import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../DTO/userDTO";
import { loginUserService, registerUserService } from "../services/usersService";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  const userData: RegisterDTO = req.body;

  try {
    const user = await registerUserService(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const userData: LoginDTO = req.body;
  
    try {
      const { user, token } = await loginUserService(userData);
  
      res.header("Authorization", `Bearer ${token}`);
      res.header("Access-Control-Expose-Headers", "Authorization");
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: "User login failed", error: (error as Error).message });
    }
  };

export const getUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching user data." });
    }
  };