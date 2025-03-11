 import * as express from 'express';
 import {Request, Response} from "express";
import { authMiddleware, AuthRequest } from '../middleware/middleware';
import Recipe from '../models/Recipe';


 const router = express.Router(); 

 router.post('/create', authMiddleware, async(req: AuthRequest, res: Response)=> {
    try {

         const {title, description, difficulty} = req.body;
         
        const newlyCreatedRecipe = new Recipe({
            title,
            description, 
            difficulty,
            createdBy: req.userId,  
        })
        await newlyCreatedRecipe.save();

        res.status(200).json({
            success: true,
            message: 'Recipe added successfully !',
            data: newlyCreatedRecipe
        })

    } catch(err){
        console.log(err); 
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again'
        })
    }
 })

 router.get('/get', authMiddleware, async(req: AuthRequest, res:Response)=> {
    try {

        const fetchAllRecipes = await Recipe.find({});

        res.status(200).json({
            success: true, 
            data: fetchAllRecipes
        })

    } catch(err){
        console.log(err); 
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again'
        })
    }
 })
 router.get('/get/:id', authMiddleware, async(req: AuthRequest, res:Response)=> {
    try {

        const getSingleRecipe = await Recipe.findOne({
            _id: req.params.id,
            // createdBy: req.userId
        });
        if(!getSingleRecipe){
            return res.status(400).json({
                success: false, 
                message: 'Recipe not found!'
            })
        }
        res.status(200).json({
            success: true, 
            message:'Recipe is fetchd successfully',
            data: getSingleRecipe
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again'
        })
    }
 })

 router.delete('/delete/:id',authMiddleware, async(req, res)=> {
    try {

        const getSingleRecipe = await Recipe.findOne({
            _id: req.params.id,
            //  createdBy: req.params.id
        });
        if(!getSingleRecipe){
            return res.status(400).json({
                success: false, 
                message: `You don't have permission to delete the recipe `
            })
        }

        await getSingleRecipe.deleteOne()
        res.status(200).json({
            success: true, 
            message:'Recipe deleted successfully',
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again'
        })
    }
 })

 export default router


