
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

        const interviewReportByAI  = await aiService.generateInterviewReport({ 
                resume:resumeContent.text,
                jobDescription,
                selfDescription
        })
        console.log(interviewReportByAI)
        const interviewReport = await interviewReportModel.create({
                user: req.user._id,
                resume: resumeContent.text,
                selfDescription,
                jobDescription,
                ...interviewReportByAI
        })

        


        res.status(201).json({
                success :true,
                message:"Interview report generated successfully",
                interviewReport,
                interviewReportByAI,

        })
})

/**
 * @controller getInterviewReportController
 * @name getInterviewReportController
 * @description Get an interview report by id
 * @param {*} req
 * @param {*} res
 * @access private
 */

const getInterviewReportController = TryCatch(async(req,res,_next)=>{
        
        const {interviewId} = req.params

        const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user._id}).populate('user').exec()
       
        if(!interviewReport){
                return res.status(404).json({
                        success:false,
                        message:"Interview report not found"
                })
        }

        res.status(201).json({
                success :true,
                message:"Interview report get successfully",
                interviewReport

        })
})
/**
 * @controller getAllInterviewReportsController
 * @name getAllInterviewReportsController
 * @description Get all interview reports for a user
 * @param {*} req
 * @param {*} res
 * @access private
 */

const getAllInterviewReportsController = TryCatch(async(req,res,_next)=>{
        

        const interviewReports = await interviewReportModel.find({user:req.user._id}).select(
                "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
        )


        res.status(201).json({
                success :true,
                message:"Interview report get successfully",
                interviewReports

        })
})
export default {
        generateInterviewReportController,
        getInterviewReportController,
        getAllInterviewReportsController
}