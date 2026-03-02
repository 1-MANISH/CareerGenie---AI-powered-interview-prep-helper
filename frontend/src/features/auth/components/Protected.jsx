import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth.js"
import Loading from "./Loading.jsx"
function Protected({children}) {

        const {user,loading} = useAuth()
        if(loading){
                return <main>
                        <Loading />
                </main>
        }

        if(!user){
                return <Navigate to="/login" />
              
        }
        return children
        
}

export default Protected