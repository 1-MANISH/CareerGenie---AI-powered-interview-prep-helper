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


/**
 * @route GET /api/interview/report/:interviewId
 * @description  Get an interview report by id
 * @access private
 */

interviewRouter.get("/report/:interviewId",middleware.authUser,interviewController.getInterviewReportController)

/**
 * @route GET /api/interview/reports
 * @description  Get an interview reports for a user
 * @access private
 */

interviewRouter.get("/reports",middleware.authUser,interviewController.getAllInterviewReportsController)


/**
 * 
 * @route GET /api/interview/resume/pdf/:interviewId
 * @description  Generate ATS job resume from resume and job description and self description
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewId",middleware.authUser,interviewController.generateATSJobResumeController)

export default interviewRouter