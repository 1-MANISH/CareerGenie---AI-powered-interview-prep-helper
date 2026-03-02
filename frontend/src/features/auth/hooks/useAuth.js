import { useEffect } from "react"
import { useAuthContext } from "../auth.context"
import {register,login,logout,getMyProfile} from "../services/auth.api.js"
// hooks layer -> manage state + services layer -> manage api calls + business logic

export const useAuth = () => {

        const {user,setUser,loading,setLoading} = useAuthContext()

        const handleRegister = async ({username,email,password}) =>{
                try {
                        setLoading(true)
                        const data = await register({username,email,password})
                        setUser(data.user)
                } catch (error) {
                        setUser(null)
                        throw error
                }finally{
                        setLoading(false)
                }
        }
        const handleLogin = async ({email,password}) =>{
                try {
                        setLoading(true)
                        const data = await login({email,password})
                        setUser(data.user)
                } catch (error) {
                        setUser(null)
                        throw error
                }finally{
                        setLoading(false)
                }
        }
     
        const handleLogout = async () =>{
                try {
                        setLoading(true)
                        await logout()
                        setUser(null)
                } catch (error) {
                        throw error
                }finally{
                        setLoading(false)
                }
        }

        useEffect(()=>{
                const fetchMyProfile  = async () =>{
                        try {
                                setLoading(true)
                                const data = await getMyProfile()
                                setUser(data.user)
                        } catch (error) {
                                setUser(null)
                        }finally{
                                setLoading(false)
                        }
                }
                fetchMyProfile()
        },[])
        
        return {
                user,
                loading,
                handleRegister,
                handleLogin,
                handleLogout
        }

}