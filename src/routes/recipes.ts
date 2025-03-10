 import * as express from 'express';
 import {Request, Response} from "express";
import { authMiddleware, AuthRequest } from '../middleware/middleware';
import Recipe from '../models/Recipe';


 const router = express.Router(); 

 router.post('/create', authMiddleware, async(req: AuthRequest, res: Response)=> {
    const {title, description, difficulty} = req.body;
    // 
    const newlyCreatedRecipe = new Recipe({
        title,
        description, 
        difficulty,
        createdBy: req.userId,  
    })
    await newlyCreatedRecipe.save();

    res.status(200).json({
        success: true,  
        message: 'Recipe added successfully !'
    })
 })

 export default router


