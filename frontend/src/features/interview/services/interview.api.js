import axios from 'axios';

const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
        withCredentials:true
})

/**
 * @function generateInterviewReport
 * @description Generate an interview report
 * @param {*} param0 
 * @returns 
 */
export async function generateInterviewReport({resumeFile,selfDescription,jobDescription}){

        try {
                const formData = new FormData()
                formData.append('resume', resumeFile)
                formData.append('selfDescription', selfDescription)
                formData.append('jobDescription', jobDescription)

                const response = await axiosInstance.post(
                        '/api/interview/generate-report', 
                        formData,
                        {
                                headers: {
                                        'Content-Type': 'multipart/form-data'
                                }
                        }
                )
                return response.data
        } catch (error) {
                throw error
        }
}

/**
 * @function getInterviewReportById
 * @description Get an interview report
 * @param {*} param0 
 * @returns 
 */
export async function getInterviewReportById({interviewId}){

        try {
                const response = await axiosInstance.get(
                        `/api/interview/report/${interviewId}`, 
                )
                return response.data
        } catch (error) {
                throw error
        }
}

/**
 * @function getAllInterviewReports
 * @description Get all interview reports
 * @param {*} param0
 * @returns 
 */
export async function getAllInterviewReports(){

        try {
                const response = await axiosInstance.get(
                        `/api/interview/reports`, 
                )
                return response.data
        } catch (error) {
                throw error
        }
}
/**
 * @function generateATSJobResume
 * @description Generate ATS job resume
 * @param {*} param0
 * @returns 
 */
export async function generateATSJobResume({interviewId}){

        try {
                const response = await axiosInstance.post(
                        `/api/interview/resume/pdf/${interviewId}`,null, {
                                responseType: 'blob'
                        }
                        
                )
                return response.data
        } catch (error) {
                throw error
        }
}