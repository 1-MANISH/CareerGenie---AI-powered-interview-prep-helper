
import TryCatch from "../utils/catchAsyncError.js";
import { PDFParse } from 'pdf-parse';
import aiService from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
/**
 * @controller generateInterviewReportController
 * @name generateInterviewReportController
 * @description Generate an interview report from resume and job description/self description
 * @param {*} req
 * @param {*} res
 * @access private 
 */
const generateInterviewReportController = TryCatch(async(req,res,_next)=>{
        
        const {selfDescription,jobDescription} = req.body
        if(!selfDescription && !jobDescription){
                return res.status(400).json({
                        success:false,
                        message:"Please provide self description or job description"
                })
        }

        const resumeFile = req.file
        if(!resumeFile){
                return res.status(400).json({
                        success:false,
                        message:"Please provide resume file"
                })
        }

        const resumeContent =await  (new PDFParse(Uint8Array.from(resumeFile.buffer))).getText()

        const interviewReportByAI  = await aiService.generateInterviewReport(
                resumeContent.text,
                jobDescription,
                selfDescription
        )

        // const interviewReport = await interviewReportModel.create({
        //         user:req.user._id,
        //         resume:resumeContent.text,
        //         jobDescription,
        //         selfDescription,
        //          ...interviewReportByAI,
        // })

        res.status(201).json({
                success :true,
                message:"Interview report generated successfully",
                // interviewReport,
                interviewReportByAI,

        })
})

export default {
        generateInterviewReportController
}