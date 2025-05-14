import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken  = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Expecting format: "Bearer <token>"

    if(!token){
        res.status(401).json({ message: "Access token missing" });
        return;
    }

    console.log(authHeader)    
    console.log(token)    
    
    try{
         const decoded = jwt.verify(token, JWT_SECRET);
         (req as any).user = decoded; // Attach user info to request object
         next();
    }catch (error) {
        res.status(401).json({ message: "Invalid access token" });
        return
    }
}