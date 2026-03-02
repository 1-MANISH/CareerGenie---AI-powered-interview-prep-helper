import express from "express";
import interviewController from "../controllers/interview.controller.js";
import middleware from "../middlewares/auth.middleware.js"
import upload from "../middlewares/file.middleware.js"
const interviewRouter = express.Router();

/**
 * @route POST /api/interview/generate-report
 * @description Generate an interview report from resume and job description/self description
 * @access private
 */

interviewRouter.post("/generate-report",middleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

export default interviewRouter