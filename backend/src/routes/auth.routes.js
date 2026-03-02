import express from 'express';
import authController from '../controllers/auth.controller.js'
import middleware from "../middlewares/auth.middleware.js"
const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user and return a token
 * @access public
 */
authRouter.post('/register',authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user and return a token
 * @access public
 */
authRouter.post('/login',authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description Logout a user by clearing the token cookie
 * @access public
 */
authRouter.get('/logout',authController.logoutUserController)


/**
 * @route GET /api/auth/me
 * @description Get the profile of the logged-in user
 * @access private (requires authentication)
 */

authRouter.get('/me',middleware.authUser,authController.getMyProfileController)



export default authRouter