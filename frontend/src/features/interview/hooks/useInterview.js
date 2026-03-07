import { useEffect } from "react"
import { useInterviewContext } from "../interview.context"
import {generateInterviewReport,getInterviewReportById,getAllInterviewReports, generateATSJobResume}  from "../services/interview.api.js"

export const useInterview = () => {

        const context = useInterviewContext()

        if(!context){
                throw new Error('useInterview must be used within a InterviewProvider')
        }

        const {loading,setLoading,report,setReport,reports,setReports,generateLoading,setGenerateLoading} = context

        const handleGenerateReport = async ({resumeFile,selfDescription,jobDescription})=>{
                let response
                try {
                        setLoading(true)
                        response = await generateInterviewReport({resumeFile,selfDescription,jobDescription})
                        setReport(response.interviewReport)
                       
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
                return  response.interviewReport
        }

         const handleGetInterviewReport = async (interviewId)=>{
                let response;
                try {
                        setLoading(true)
                         response = await getInterviewReportById({interviewId})
                        setReport(response.interviewReport)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
                return  response.interviewReport
        }
         const handleGetAllInterviewReport = async ()=>{
                let response;
                try {
                        setLoading(true)
                         response = await getAllInterviewReports()
                        setReports(response.interviewReports)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
                return  response.interviewReports
        }

         const handleGenerateResumePdf = async (interviewId)=>{
                let response
                try {
                        setGenerateLoading(true)
                        response = await generateATSJobResume({interviewId})
                        let url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `resume_${interviewId}.pdf`);
                        document.body.appendChild(link);
                        link.click();
                       
                } catch (error) {
                        throw error
                }finally{
                        setGenerateLoading(false)
                }
    
        }

        // useEffect(()=>{

        // },[])

        return {
                loading,
                generateLoading,
                report,
                reports,
                handleGenerateReport,
                handleGetInterviewReport,
                handleGetAllInterviewReport,
                handleGenerateResumePdf
        }
}