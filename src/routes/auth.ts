import * as express from "express" ;
import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

// registeration route
router.post('/register', async(req: Request, res: Response)=> {
    try{
        const {email, password} = req.body; 
        const isRegistered =await User.findOne({email});
        //
        if(isRegistered){
            res.status(400).json({
                message: 'User with the given email already exists. Please try with the different email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  new User({email, password: hashedPassword});
        newUser.save();
        res.status(200).json({
            success: true,
            message: 'User created successfully'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: 'Something went wrong. Please try again.' })
    }
})



