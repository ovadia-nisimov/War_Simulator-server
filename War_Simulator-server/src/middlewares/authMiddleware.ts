import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token must be provided" });
      return;
    }
    console.log(token);
    
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    (req as any).user = payload;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token", details: err });
  }
};