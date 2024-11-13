import { Request, Response } from "express";
import LoginDto from "../DTO/LoginDto";
import RegisterDto  from "../DTO/RegisterDto";
import { UserRegister, userLogin } from "../services/usersService";


export const login = async (req: Request<LoginDto>, res: Response) => {
  try {
    const {userFromDatabase, token} = await userLogin(req.body)
    res.header('Authorization', token);
    res.header('Access-Control-Expose-Headers', 'Authorization');
        res.status(200).json(userFromDatabase)

  } catch (erorr) {
    res.status(400).json({ message: (erorr as Error).message })  }
};


export const register = async (req: Request<RegisterDto>, res: Response) => {
  try {
    const freshlyCreatedUser = await UserRegister(req.body)
    res.status(201).json(freshlyCreatedUser)
  } catch (erorr) {
    res.status(400).json({ message: (erorr as Error).message })  }
  
};


