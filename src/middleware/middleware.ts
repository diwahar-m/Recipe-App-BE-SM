import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string
}

export interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer', "");
    if(!token){
         res.status(401).json({
            success: false, 
            message: 'No valid token is provided! Authorization failed'
        })
    }
    try {
        const decoded = jwt.verify(token, 'JWT_SECRET') as DecodedToken;
        req.userId = decoded.userId;
        next();

    } catch(err){
         res.status(401).json({
            success: false, 
            message: 'Token is not a valid token, pls try again'
        })
    }
}