import { createContext, useContext, useState } from "react";

export const InterviewContext = createContext({})


export const InterviewProvider = ({children}) => {

        const [loading,setLoading] = useState(false)
        const [generateLoading,setGenerateLoading] = useState(false)
        const [report,setReport] = useState(null)
        const [reports,setReports] = useState([])

        return(
                <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports,generateLoading,setGenerateLoading}} >
                        {children}
                </InterviewContext.Provider>
        )
}

export const useInterviewContext = () => useContext(InterviewContext)