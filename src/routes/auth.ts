import * as express from "express" ;
import User from "../models/User";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser =  new User({email, password: hashedPassword});
        newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: 'Something went wrong. Please try again.' })
    }
})

// login routee 
router.post('/login', async (req: Request, res: Response)=> {
    try {
        const {email, password} = req.body;
        const currentUser = await User.findOne({email});
        if(!currentUser){
            return res.status(400).json({
                success: false, 
                message: 'Invalid credentials'
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, currentUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false, 
                message: 'Invalid password'
            })
        }
        const token = jwt.sign({
            userId: currentUser._id
        }, 'JWT_SECRET', {expiresIn: '1h'});

        res.status(200).json({
            success: false, 
            token, 
            userId: currentUser._id
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false, 
            message: 'Something went wrong! Please try again.'
        })
    }
})

export default router


