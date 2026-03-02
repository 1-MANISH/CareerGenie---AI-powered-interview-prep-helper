import jwt from 'jsonwebtoken'
import TryCatch from '../utils/catchAsyncError.js'
import userModel from '../models/user.model.js'
import blacklistModel from '../models/blacklist.model.js'

/**
 * @middleware authMiddleware
 * @description Middleware to protect routes that require authentication. It verifies the JWT token from cookies and attaches the user object to the request.
 * @param {*} req 
 * @param {*} res
 */

const authUser = TryCatch(async(req,res,next)=>{

        const token = req.cookies.career_genie_token

        if(!token){
                return res.status(401).json({
                        success:false,
                        message:"Unauthorized: No token provided"
                })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)


        // is token not in blocklist (optional enhancement for better security)
        const isBlacklisted  = await blacklistModel.findOne({token:token})

        if(isBlacklisted){
                return res.status(401).json({
                        success:false,
                        message:"Unauthorized: Token is not valid"
                })
        }

        const user  = await userModel.findById(decoded.id).select('-password')

        if(!user){
                return res.status(401).json({
                        success:false,
                        message:"Unauthorized access: User not found"
                })
        }

        req.user = user

        next()
})

export default {authUser}