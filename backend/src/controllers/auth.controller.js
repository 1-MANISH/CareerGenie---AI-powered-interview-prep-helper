// importing utilities and models
import userModel from '../models/user.model.js';
import blacklistModel from '../models/blacklist.model.js';
import TryCatch from '../utils/catchAsyncError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @controller registerUserController
 * @name registerUserController
 * @description Register a new user and return a token
 * @param {*} req 
 * @param {*} res 
 * @access public
 */
const registerUserController = TryCatch(async(req,res,_next)=>{
     
        const {username,email,password} = req.body

        if(!username || !email || !password){
                return res.status(400).json({
                        success:false,
                        message:"Please provide all required fields (name, email, password)"
                })
        }

        const isUserAlreadyExists = await userModel.findOne({
                $or:[{email:email},{username:username}]
        })

        if(isUserAlreadyExists){
                return res.status(400).json({
                        success:false,
                        message:"User already exists with the provided email or username"
                })
        }

        const hashedPassword  = await bcrypt.hash(password,10)

        const newUser = await userModel.create({
                username,
                email,
                password:hashedPassword
        })

        const token = jwt.sign(
                {
                        id:newUser._id,
                        username:newUser.username,
                        email:newUser.email   
                },
                process.env.JWT_SECRET,
                {
                        expiresIn:'1d'
                }
        )

        res.cookie(
                'career_genie_token',
                token,
                {
                        httpOnly:true,//XSS protection
                        secure:process.env.NODE_ENV === 'development'?false:true,//only send cookie over https in production
                        sameSite:process.env.NODE_ENV === 'development'?'lax':'none',//allow cross-site cookies in production for frontend-backend communication
                        maxAge:1*24*60*60*1000
                }
        )

        res.status(201).json({
                success:true,
                message:"User registered successfully",
                user:{
                        id:newUser._id,
                        username:newUser.username,
                        email:newUser.email
                }
        })
})

/**
 * @controller loginUserController
 * @name loginUserController
 * @description Login a user and return a token
 * @param {*} req 
 * @param {*} res
 * @access public
 */

const loginUserController = TryCatch(async(req,res,_next)=>{     
        const {email,password} = req.body

        if(!email || !password){
                return res.status(400).json({
                        success:false,
                        message:"Please provide all required fields (email, password)"
                })
        }

        const user = await userModel.findOne({email:email})

        if(!user){
                return res.status(400).json({
                        success:false,
                        message:"Invalid email or password"
                })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
                return res.status(400).json({
                        success:false,
                        message:"Invalid email or password"
                })
        }

        const token  = jwt.sign(
                {
                        id:user._id,
                        username:user.username,
                        email:user.email
                },
                process.env.JWT_SECRET,
                {
                        expiresIn:'1d'
                }
        )

        res.cookie(
                'career_genie_token',
                token,
                {
                        httpOnly:true,//XSS protection
                        secure:process.env.NODE_ENV === 'development'?false:true,//only send cookie over https in production
                        sameSite:process.env.NODE_ENV === 'development'?'lax':'none',//allow cross-site cookies in production for frontend-backend communication
                        maxAge:1*24*60*60*1000
                }
        )
        res.status(200).json({
                success:true,
                message:"User logged in successfully",
                user:{
                        id:user._id,
                        username:user.username,
                        email:user.email
                }
        })
})


/**
 * @controller logoutUserController
 * @name logoutUserController
 * @description Logout a user by clearing the token cookie
 * @param {*} req 
 * @param {*} res
 * @access public
 */

const logoutUserController = TryCatch(async(req,res,_next)=>{

        // block list this token in future for better security (optional enhancement)

        const token = req.cookies.career_genie_token

        if(token){
                // Optionally, you can verify the token and add it to a blocklist for better security
                await blacklistModel.create({
                        token:token,
                })
        }

        res.cookie(
                'career_genie_token',
                null,
                {
                       maxAge:0
                }
        )

        res.status(200).json({
                success:true,
                message:"User logged out successfully"
        })
})


/**
 * @controller getMyProfileController
 * @name getMyProfileController
 * @description Get the profile of the logged-in user
 * @param {*} req 
 * @param {*} res
 * @access private (requires authentication)
 */

const getMyProfileController = TryCatch(async(req,res,_next)=>{

        const user = req.user

        res.status(200).json({
                success:true,
                message:"User profile fetched successfully",
                user
        })
})
export default {
        registerUserController,
        loginUserController,
        logoutUserController,
        getMyProfileController
}