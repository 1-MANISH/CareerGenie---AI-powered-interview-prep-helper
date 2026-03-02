import { createContext, useContext, useState } from "react";

// creating context
export const AuthContext = createContext({})


// creating provider
export const AuthProvider = ({children}) => {

        const [user,setUser] = useState(null)
        const [loading,setLoading] = useState(true)

        return(
                <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
                        {children}
                </AuthContext.Provider>
        )
}

// creating custom hook to use auth context
export const useAuthContext = () => useContext(AuthContext)