import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const verifyUserJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
     res.status(401).json({ error: 'Authorization token is missing' });
     return
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded as jwt.JwtPayload;
    next();
  } catch (error) {
     res.status(401).json({ error: 'Invalid or expired token' });
    return
  }
};

