// dependencies
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// load environment variables from .env file
dotenv.config()

// routes import
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';

const app  = express()


// middleware
app.use(express.json({limit:'50mb'})) // Middleware to parse JSON request bodies
app.use(cookieParser()) // Middleware to parse cookies from incoming requests
app.use(cors({
        origin:process.env.FRONTEND_URL,
        credentials:true
}))

console.log(process.env.FRONTEND_URL)
// routes addition
app.use('/api/auth',authRouter)
app.use('/api/interview',interviewRouter)


export default app