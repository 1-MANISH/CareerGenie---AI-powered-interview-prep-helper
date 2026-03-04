import { useEffect } from "react"
import { useInterviewContext } from "../interview.context"
import {generateInterviewReport,getInterviewReportById,getAllInterviewReports}  from "../services/interview.api.js"

export const useInterview = () => {

        const context = useInterviewContext()

        if(!context){
                throw new Error('useInterview must be used within a InterviewProvider')
        }

        const {loading,setLoading,report,setReport,reports,setReports} = context

        const handleGenerateReport = async ({resumeFile,selfDescription,jobDescription})=>{
                try {
                        setLoading(true)
                        const response = await generateInterviewReport({resumeFile,selfDescription,jobDescription})
                        setReport(response.interviewReport)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
        }
         const handleGetInterviewReport = async (interviewId)=>{
                try {
                        setLoading(true)
                        const response = await getInterviewReportById({interviewId})
                        setReport(response.interviewReport)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
        }
         const handleGetAllInterviewReport = async ()=>{
                try {
                        setLoading(true)
                        const response = await getAllInterviewReports()
                        setReports(response.interviewReports)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
        }

        useEffect(()=>{

        },[])

        return {
                loading,
                report,
                reports,
                handleGenerateReport,
                handleGetInterviewReport,
                handleGetAllInterviewReport
        }
}